"use client";

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    BrainCircuit, SearchCheck, ArrowRight, MicVocal, 
    LucideBinoculars, LucideCircleFadingPlus, LucideHandCoins, 
    LucideNetwork, LucideBookOpenText, LucideRadioTower 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AImodelsOptions, SearchSourceOptions } from '@/Services/Shared';
import { Switch } from "@/components/ui/switch";
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { Library } from '@/configs/schema';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import ChatIcon from '../components/icons/ChatIcons';
import DeepScan from '../components/icons/DeepScan';
import SearchBan from '../components/icons/SearchBan';

const icons = {
    Globe: (props) => <LucideRadioTower {...props} />,
    GraduationCap: (props) => <LucideBookOpenText {...props} />,
    Users: (props) => <LucideNetwork {...props} />,
    Landmark: (props) => <LucideHandCoins {...props} />,
};

function ChatInputBox() {
    const { user } = useUser();
    const [userSearchInput, setUserSearchInput] = useState('');
    const [searchType, setSearchType] = useState('search');
    const [activeTab, setActiveTab] = useState('search');
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState('Got a Question?'); // State for dynamic placeholder
    const router = useRouter();

    const onSearchQuery = async () => {
        setLoading(true);
        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error("User email not available");
            setLoading(false);
            return;
        }
        const libId = uuidv4();
        try {
            await db.insert(Library).values({
                searchInput: userSearchInput,
                userEmail: user.primaryEmailAddress.emailAddress,
                type: searchType,
                libId: libId
            }).returning();
            router.push('/search/' + libId);
        } catch (error) {
            console.error("Error saving search:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVoiceInterface = () => {
        router.push('/voice-input'); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && userSearchInput) {
            e.preventDefault();
            onSearchQuery();
        }
    };

    // This function now handles changing both the search type and the placeholder text
    const handleTabChange = (value) => {
        setSearchType(value);
        setActiveTab(value);
        if (value === 'search') {
            setPlaceholder('Got a Question?');
        } else if (value === 'research') {
            setPlaceholder('Dig into the Details');
        } else if (value === 'nosearch') {
            setPlaceholder('Ask direct to the LLM Model');
        }
    };

    return (
        <div className='flex flex-col h-screen items-center justify-center w-full'>
            <h2 className='text-3xl text-primary animate-fade-in-up text-shadow-sm '>
                Hello, <span className='font-sans-shariif shimmer-text'>{user?.firstName}</span>
            </h2>
            {/* Main bordered container */}
            <div className='p-2 w-full max-w-2xl border rounded-2xl mt-10'>
                {/* NEW LAYOUT: A vertical flex column */}
                <div className='flex flex-col'>
                    {/* Top part: The full-width, auto-resizing textarea */}
                    <TextareaAutosize
                        placeholder={placeholder}
                        value={userSearchInput}
                        onChange={(e) => setUserSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='w-full p-2 bg-transparent text-base outline-none resize-none'
                        maxRows={8}
                    />
                    
                    {/* Bottom part: A flex row for all the controls */}
                    <div className='flex justify-between items-center mt-2'>
                        {/* Left side: Tab buttons */}
                        <Tabs defaultValue="search" value={searchType} onValueChange={handleTabChange}>
                            <TabsList>
                                <TabsTrigger value="search" className={'data-[state=active]:text-primary'}>
                                    <SearchCheck /> Scan
                                </TabsTrigger>
                                <TabsTrigger value="research" className={'data-[state=active]:text-primary'}>
                                    <DeepScan className="w-6 h-6 mr-1" active={activeTab === 'research'} /> DeepScan
                                </TabsTrigger>
                                <TabsTrigger value="nosearch" className={'data-[state=active]:text-primary'}>
                                    <SearchBan className="w-6 h-6 mr-1" active={activeTab === 'nosearch'} /> No Search
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {/* Right side: All the icon buttons */}
                        <div className='flex gap-2 items-center'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'ghost'}><BrainCircuit className='text-gray-500 h-5 w-5' /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {AImodelsOptions.map((model, index) => (
                                        <DropdownMenuItem key={index}>
                                            <div className='mb-1'><h2>{model.name}</h2><p className='text-xs'>{model.desc}</p></div>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'ghost'} className="p-2"><LucideBinoculars className='h-5 w-5 text-gray-500' /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {SearchSourceOptions.map((source) => {
                                        const IconComponent = icons[source.icon];
                                        return (
                                            <DropdownMenuItem key={source.id} onSelect={(e) => e.preventDefault()}>
                                                <div className='flex items-center justify-between w-full'>
                                                    <div className='flex items-center gap-2'>
                                                        <IconComponent className="h-4 w-4 text-gray-500" />
                                                        <div><h2 className='text-sm'>{source.name}</h2><p className='text-xs text-gray-500'>{source.desc}</p></div>
                                                    </div>
                                                    <Switch />
                                                </div>
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant={'ghost'}><LucideCircleFadingPlus className='text-gray-500 h-5 w-5' /></Button>
                            <Button variant={'ghost'}><MicVocal className='text-gray-500 h-5 w-5' /></Button>
                            <Button onClick={userSearchInput ? onSearchQuery : handleVoiceInterface} disabled={loading}>
                                {loading ? (
                                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                                ) : userSearchInput ? (
                                    <ArrowRight className='text-white h-5 w-5' />
                                ) : (
                                    <ChatIcon className='text-white h-5 w-5' />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputBox;