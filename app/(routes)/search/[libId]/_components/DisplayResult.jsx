"use client";
import React, { useEffect, useState } from 'react';
import { Image, VideoIcon } from 'lucide-react';
import AnimatedLogoIcon from '@/app/components/icons/AnimatedLogoIcon';
import AnswerDisplay from '@/app/(routes)/search/[libId]/_components/AnswerDisplay';
import { SEARCH_RESULT } from '@/Services/Shared';
import { useParams } from 'next/navigation';
import { db } from '@/configs/db';
import { Chats } from '@/configs/schema';
import { eq } from 'drizzle-orm';

const SourceIcon = ({ className }) => (
    <img src='/icons/source.svg' alt='Sources Icon' className={className} />
);

const tabs = [
    { label: 'Answer', icon: AnimatedLogoIcon },
    { label: 'Image', icon: Image, color: '#1279cf' },
    { label: 'Video', icon: VideoIcon, color: '#1279cf' },
    { label: 'Sources', icon: SourceIcon },
];

function DisplayResult({ searchInputRecord }) {
    const [activeTab, setActiveTab] = useState('Answer');
    const [searchResult, setSearchResult] = useState(SEARCH_RESULT);
    const { libId } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const GetSearchApiResult = async () => {
            try {
                // --- 1. FETCH RESULTS FROM THE API ---
                const response = await fetch('/api/brave-search-api', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        searchInput: searchInputRecord?.searchInput,
                        searchType: searchInputRecord?.type
                    }),
                    signal: signal // Pass the abort signal to fetch
                });

                if (!response.ok) {
                    // This check might not be needed if aborting throws an error, but it's good practice
                    if (response.status !== 0) { // Don't log abort errors
                         console.error("API call failed:", response.status, response.statusText);
                    }
                    return;
                }

                const resultData = await response.json();
                setSearchResult(resultData);
                console.log("API Response Received:", resultData);
                
                const formattedSerachResp = resultData?.web?.results?.map((item) => ({
                    title: item?.title,
                    description: item?.description,
                    long_name: item?.profile?.long_name,
                    img: item?.profile?.img,
                    url: item?.url,
                    thumbnail: item?.thumbnail?.src
                }));
                
                // --- 2. SAVE RESULTS TO DB (IDEMPOTENTLY) ---
                const existingChat = await db.select().from(Chats).where(eq(Chats.libId, libId)).limit(1);

                if (existingChat.length === 0) {
                    const savedData = await db.insert(Chats).values({
                        libId: libId,
                        searchResult: formattedSerachResp,
                        aiResponse: ''
                    }).returning();
                    console.log("Saved NEW result to DB:", savedData);
                } else {
                    console.log("Result already in DB. Skipping insert.");
                }

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        };

        if (searchInputRecord) {
            GetSearchApiResult();
        }

        // Cleanup function: This runs when the component unmounts.
        // In Strict Mode, it aborts the first fetch call.
        return () => {
            controller.abort();
        };
    }, [searchInputRecord, libId]); // Add libId to dependency array

    return (
        <div className='mt-7 w-full overflow-hidden'>
            <h2 className='font-medium text-xl sm:text-2xl lg:text-3xl line-clamp-2 break-words'>
                {searchInputRecord?.searchInput}
            </h2>
            <div className="w-full mt-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-4 sm:gap-6 min-w-max">
                            {tabs.map(({ label, icon: Icon, badge, color }) => (
                                <button
                                    key={label}
                                    onClick={() => setActiveTab(label)}
                                    className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap ${activeTab === label ? 'text-black' : ''}`}
                                >
                                    <Icon
                                        className={label === 'Answer' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4'}
                                        color={color}
                                    />
                                    <span className="text-xs sm:text-sm">{label}</span>
                                    {badge && (
                                        <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{badge}</span>
                                    )}
                                    {activeTab === label && (
                                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#1279cf] rounded"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 ml-4 whitespace-nowrap hidden sm:block">
                        1 task
                    </div>
                </div>
            </div>
            <div className='w-full'>
                {activeTab === 'Answer' && searchResult && (
                    <AnswerDisplay searchResult={searchResult} />
                )}
            </div>
        </div>
    );
}

export default DisplayResult;