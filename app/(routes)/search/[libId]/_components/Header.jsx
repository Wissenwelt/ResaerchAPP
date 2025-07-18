import { LinkIcon, Share } from 'lucide-react';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function Header({ searchInputRecord }) {
  return (
    <div className='p-4 flex justify-end items-center relative'>
      
      <h2 className='absolute left-1/2 -translate-x-1/2 line-clamp-1 max-w-md'>{searchInputRecord?.searchInput}</h2>

      <div className='flex gap-3 items-center'>
        <Button><LinkIcon /></Button>
        <Button><Share />Share</Button>
        <UserButton />
      </div>
    </div>
  )
}

export default Header;