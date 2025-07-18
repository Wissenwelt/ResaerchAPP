"use client";
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Earth, GalleryHorizontalEnd, LogIn, PenSquare, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SignUpButton, SignOutButton, useUser } from '@clerk/nextjs';


const MenuOptions = [
    {
        title: 'Research Canvas',
        icon: Search,
        path: '/'
    },
    {
        title: 'Unearth',
        icon: Earth,
        path: '/unearth'
    },
    {
        title: 'Bibliotheca',
        icon: GalleryHorizontalEnd,
        path: '/bibliotheca'
    },
];

function AppSidebar() {

     const path = usePathname();
    const { isSignedIn } = useUser();

    return (
        <Sidebar className='h-screen bg-gradient-to-b from-transparent to-accent'>
            <SidebarHeader className="flex flex-nowrap items-center justify-center gap-3 py-1 px-4">
                <div className="flex flex-nowrap items-center justify-center gap-1 p-1">
                    <Image src={'/logo.svg'} alt='logo' width={60} height={60} />
                    <h1 className="text-3xl font-sans-sharrif font-bold text-[#0866FF] drop-shadow-md">Victus AI</h1>
                </div>
            </SidebarHeader>
            <SidebarContent className='h-screen bg-gradient-to-b from-transparent to-accent'>
                <SidebarGroup>
                    <div className="p-2">
                        <Button variant={'secondary'} className={'w-full justify-start text-gray-700 mb-1 bg-white'}>
                            <PenSquare className='mr-3 h-6 w-6' />
                            <span className="text-md">New Chat</span>
                        </Button>
                    </div>
                    <SidebarMenu>
                        {MenuOptions.map((menu, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild 
                                className={`group p-5 py-5 hover:bg-transparent text-gray-700 hover:text-[#1279cf] hover:font-bold
                                ${path === menu.path && 'text-[#1279cf] font-bold'}`}>
                                    <a href={menu.path} className=''>
                                        <menu.icon className={`h-8 w-8 transition-transform group-hover:scale-110 ${path === menu.path && 'scale-110'}`}/>
                                        <span className='text-lg'>{menu.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                        {!isSignedIn && (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild
                                className={`group p-5 py-5 hover:bg-transparent text-gray-700 hover:text-[#1279cf] hover:font-bold
                                ${path === '/sign-in' && 'text-[#1279cf] font-bold'}`}>
                                    <a href="/sign-in" className=''>
                                        <LogIn className={`h-8 w-8 transition-transform group-hover:scale-110 ${path === '/sign-in' && 'scale-110'}`}/>
                                        <span className='text-lg'>Sign In</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>

                    {!isSignedIn ? (
                        <SignUpButton>
                            <Button className='rounded-full mt-5'>Sign Up</Button>
                        </SignUpButton>
                    ) : (
                        <SignOutButton>
                            <Button className='rounded-full mt-5'>Sign Out</Button>
                        </SignOutButton>
                    )}

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='bg-accent'>
                <div className='p-3 flex flex-col'>
                    <h2 className='text-gray-600'>Try Now</h2>
                    <p className='text-gray-500'>Upgrade for image upload, smart AI and more featues like Course Canvas and project Canvas</p>
                    <Button variant={'secondary'} className={'text-gray-500 mb-1'}>Learn More</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar