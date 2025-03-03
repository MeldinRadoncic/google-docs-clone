import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileIcon } from 'lucide-react'
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
            <Image src='/logo.svg' width={100} height={50} alt='Logo' />
            </Link>
            <div className='flex flex-col'>
            {/* Document Input */}
            <DocumentInput />
            {/* Menubar */}
            <div className="flex">
                <Menubar className='border-none bg-transparent shadow-none p-0 h-auto'>
                    <MenubarMenu>
                        <MenubarTrigger>
                            File
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New</MenubarItem>
                            <MenubarItem>Open</MenubarItem>
                            <MenubarItem className='cursor-pointer'>
                                <FileIcon className='size-4 mr-2'/>
                                Save
                                </MenubarItem>
                            <MenubarItem>Save As</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Export</MenubarItem>
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>

                    </MenubarMenu>
                    </Menubar>
            </div>
            </div>
            </div>
            </nav>
    )
}

