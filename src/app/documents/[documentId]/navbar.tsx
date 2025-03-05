'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileIcon, FileJsonIcon,GlobeIcon, TextIcon, FilePlusIcon, PenIcon, TrashIcon, PrinterIcon } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import {
    Menubar,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar'

import { DocumentInput } from './document-input'

export const Navbar = () => {

    return (
        <nav className="flex items-center justify-between">
            <div className='flex gap-2 items-center'>
            <Link href='/'>
            <Image src='/logo.svg' width={30} height={30} alt='Logo' />
            </Link>
            <div className='flex flex-col'>
            {/* Document Input */}
            <DocumentInput />
            {/* Menubar */}
            <div className="flex">
                <Menubar className='border-none bg-transparent shadow-none p-0 h-auto'>
                    {/* File */}
                    <MenubarMenu>
    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
        File
    </MenubarTrigger>
    <MenubarContent className="print:hidden">
        <MenubarSub>
            <MenubarSubTrigger>
                <FileIcon className="size-4 mr-2" />
                Save
            </MenubarSubTrigger>
            <MenubarSubContent>
                {/* JSON */}
                <MenubarItem>
                    <FileJsonIcon className="size-4 mr-2" />
                    JSON
                </MenubarItem>
                {/* HTML */}
                <MenubarItem>
                    <GlobeIcon className="size-4 mr-2" />
                    HTML
                </MenubarItem>
                {/* PDF */}
                <MenubarItem>
                    <BsFilePdf className="size-4 mr-2" />
                    PDF
                </MenubarItem>
                {/* Text */}
                <MenubarItem>
                    <TextIcon className="size-4 mr-2" />
                    Text
                </MenubarItem>
            </MenubarSubContent>
        </MenubarSub>
        <MenubarItem>
            <FilePlusIcon className='size-4 mr-2'/>
            New
        </MenubarItem>
        <MenubarSeparator />
        {/* Rename */}
        <MenubarItem>
            <PenIcon className='size-4 mr-2'/>
            Rename
        </MenubarItem>
        {/* Remove */}
        <MenubarItem>
            <TrashIcon className='size-4 mr-2'/>
            Remove
        </MenubarItem>
        <MenubarSeparator />
        {/* Printer */}
        <MenubarItem onClick={() => window.print()}>
            <PrinterIcon className='size-4 mr-2'/>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>
    </MenubarContent>
</MenubarMenu>


                    {/* Edit */}
                    <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Edit
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Undo</MenubarItem>
                            <MenubarItem>Redo</MenubarItem>

                               </MenubarContent>
                    </MenubarMenu>
                    {/* Insert */}
                    <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Insert
                        </MenubarTrigger>
                        <MenubarContent>
                            

                               </MenubarContent>
                    </MenubarMenu>
                    {/* Format */}
                    <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                            Format
                        </MenubarTrigger>
                        <MenubarContent>
                            

                               </MenubarContent>
                    </MenubarMenu>
                    </Menubar>
            </div>
            </div>
            </div>
            </nav>
    )
}

