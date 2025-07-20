// DisplayResult.js - Fixed responsive tabs and layout
"use client";
import React, { useEffect, useState } from 'react';
import { Image, VideoIcon } from 'lucide-react';
import AnimatedLogoIcon from '@/app/components/icons/AnimatedLogoIcon';
import AnswerDisplay from '@/app/(routes)/search/[libId]/_components/AnswerDisplay';
import axios from 'axios';
import { SEARCH_RESULT } from '@/Services/Shared';
import { useParams } from 'next/navigation';

// Imports for Drizzle ORM
import { db } from '@/configs/db';
import { Chats } from '@/configs/schema';

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
    const {libId}=useParams();

    useEffect(() => {
        if (searchInputRecord) {
            GetSearchApiResult();
        }
    }, [searchInputRecord]);

    const GetSearchApiResult = async () => {
        const result = await axios.post('/api/brave-search-api', {
            searchInput: searchInputRecord?.searchInput,
            searchType: searchInputRecord?.type
        });
        console.log(result.data);

        
        const seachResp=result.data;
        // Save to the DB
        const formattedSerachResp=seachResp?.web?.results?.map((item,index)=>(
            {
                title: item?.title,
                description:item?.description,
                long_name:item?.profile?.long_name,
                img:item?.profile?.img,
                url:item?.url,
                thumbnail:item?.thumbnail?.src
            }
        ))
        console.log(formattedSerachResp);

        try {
            const savedData = await db.insert(Chats).values({
                libId: libId,
                searchResult: formattedSerachResp,
                aiResponse: '' // This field is required (notNull) in your schema
            }).returning();

            console.log("Saved to DB with Drizzle:", savedData);
        } catch (dbError) {
            console.error("Drizzle DB Error:", dbError);
        }
    };

    return (
        <div className='mt-7 w-full overflow-hidden'>
            {/* Responsive title */}
            <h2 className='font-medium text-xl sm:text-2xl lg:text-3xl line-clamp-2 break-words'>
                {searchInputRecord?.searchInput}
            </h2>

            {/* Fully responsive tabs container */}
            <div className="w-full mt-6">
                {/* Scrollable tabs container for mobile */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-4 sm:gap-6 min-w-max">
                            {tabs.map(({ label, icon: Icon, badge, color }) => (
                                <button
                                    key={label}
                                    onClick={() => setActiveTab(label)}
                                    className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap ${
                                        activeTab === label ? 'text-black' : ''
                                    }`}
                                >
                                    <Icon
                                        className={label === 'Answer' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4'}
                                        color={color}
                                    />
                                    <span className="text-xs sm:text-sm">{label}</span>
                                    {badge && (
                                        <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                            {badge}
                                        </span>
                                    )}
                                    {activeTab === label && (
                                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#1279cf] rounded"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Task count - hidden on very small screens */}
                    <div className="text-xs sm:text-sm text-gray-500 ml-4 whitespace-nowrap hidden sm:block">
                        1 task
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div className='w-full'>
                {activeTab === 'Answer' && searchResult && (
                    <AnswerDisplay searchResult={searchResult} />
                )}
            </div>
        </div>
    );
}

export default DisplayResult;