"use client";
import React, { useEffect, useState } from 'react';
import { Image, VideoIcon } from 'lucide-react';
import AnimatedLogoIcon from '@/app/components/icons/AnimatedLogoIcon';
import AnswerDisplay from '@/app/(routes)/search/[libId]/_components/AnswerDisplay';
// NOTE: Added axios import
import axios from 'axios';

// Create a simple component for the 'source.svg' icon.
const SourceIcon = ({ className }) => (
    <img src='/icons/source.svg' alt='Sources Icon' className={className} />
);

// The tabs array is updated with a 'color' property for the icons that need it.
const tabs = [
    { label: 'Answer', icon: AnimatedLogoIcon },
    { label: 'Image', icon: Image, color: '#1279cf' },
    { label: 'Video', icon: VideoIcon, color: '#1279cf' },
    { label: 'Sources', icon: SourceIcon },
];

function DisplayResult({ searchInputRecord }) {
    const [activeTab, setActiveTab] = useState('Answer');

    useEffect(() => {
        if (searchInputRecord) {
            GetSearchApiResult();
        }
    }, [searchInputRecord]);

    const GetSearchApiResult = async () => {
        try {
            const result = await axios.post('/api/brave-search-api', {
                searchInput: searchInputRecord?.searchInput,
                searchType: searchInputRecord?.type
            });
            
            
            console.log("Data received in DisplayResult component:", result.data);
            console.log("Stringified data:", JSON.stringify(result.data));
        } catch (error) {
            console.error("Error calling local search API:", error);
        }
    };

    return (
        <div className='mt-7'>
            <h2 className='font-medium text-3xl line-clamp-2'>
                {searchInputRecord?.searchInput}
            </h2>
            <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
                {tabs.map(({ label, icon: Icon, badge, color }) => (
                    <button
                        key={label}
                        onClick={() => setActiveTab(label)}
                        className={`flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${activeTab === label ? 'text-black' : ''}`}
                    >
                        <Icon
                            className={label === 'Answer' ? 'w-6 h-6' : 'w-4 h-4'}
                            color={color}
                        />
                        <span>{label}</span>
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
                <div className="ml-auto text-sm text-gray-500">
                    1 task <span className="ml-1" />
                </div>
            </div>

            <div>
                {activeTab === 'Answer' ?
                    <AnswerDisplay /> : null
                }
            </div>
        </div>
    );
}

export default DisplayResult;