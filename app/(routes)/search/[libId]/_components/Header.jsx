// Header.js - Keep original positioning but make responsive
import { LinkIcon, Share } from 'lucide-react';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function Header({ searchInputRecord }) {
    return (
        <div className='p-4 flex justify-end items-center relative'>
            {/* Keep original centered title but make it responsive */}
            <h2 className='absolute left-1/2 -translate-x-1/2 w-full max-w-[60%] sm:max-w-[50%] text-center truncate'>
                {searchInputRecord?.searchInput}
            </h2>

            {/* Right side buttons - made responsive */}
            <div className='flex gap-2 sm:gap-3 items-center'>
                <Button className='hidden sm:flex'>
                    <LinkIcon />
                </Button>
                <Button className='hidden sm:flex'>
                    <Share />Share
                </Button>
                {/* Mobile: show only icons */}
                <Button size="sm" className='sm:hidden'>
                    <LinkIcon className='w-4 h-4' />
                </Button>
                <Button size="sm" className='sm:hidden'>
                    <Share className='w-4 h-4' />
                </Button>
                <UserButton />
            </div>
        </div>
    );
}

export default Header;