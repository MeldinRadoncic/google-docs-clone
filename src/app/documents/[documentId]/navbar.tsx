"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileIcon,
  FileJsonIcon,
  GlobeIcon,
  TextIcon,
  FilePlusIcon,
  PenIcon,
  TrashIcon,
  PrinterIcon,
  Undo2Icon,
  Redo2Icon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
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
} from "@/components/ui/menubar";

import { DocumentInput } from "./document-input";

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            width={30}
            height={30}
            alt='Logo'
          />
        </Link>
        <div className='flex flex-col'>
          {/* Document Input */}
          <DocumentInput />
          {/* Menubar */}
          <div className='flex'>
            <Menubar className='border-none bg-transparent shadow-none p-0 h-auto'>
              {/* File */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  File
                </MenubarTrigger>
                <MenubarContent className='print:hidden'>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {/* JSON */}
                      <MenubarItem>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      {/* HTML */}
                      <MenubarItem>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      {/* PDF */}
                      <MenubarItem>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      {/* Text */}
                      <MenubarItem>
                        <TextIcon className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' />
                    New
                  </MenubarItem>
                  <MenubarSeparator />
                  {/* Rename */}
                  <MenubarItem>
                    <PenIcon className='size-4 mr-2' />
                    Rename
                  </MenubarItem>
                  {/* Remove */}
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  {/* Printer */}
                  <MenubarItem
                    onClick={() =>
                      window.print()
                    }>
                    <PrinterIcon className='size-4 mr-2' />
                    Print{" "}
                    <MenubarShortcut>
                      ⌘P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Edit */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo{" "}
                    <MenubarShortcut>
                      ⌘Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo{" "}
                    <MenubarShortcut>
                      ⌘Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* Insert */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      {/* <MenubarItem>1 X 1</MenubarItem>
                                    <MenubarItem> 2 X 2 </MenubarItem>
                                    <MenubarItem> 3 X 3 </MenubarItem>
                                    <MenubarItem> 4 X 4 </MenubarItem>
                                    <MenubarItem> 5 X 5 </MenubarItem> */}
                      {Array(10)
                        .fill("")
                        .map(
                          (
                            _,
                            index,
                          ) => (
                            <MenubarItem
                              key={
                                index
                              }>
                              {index +
                                1}{" "}
                              X{" "}
                              {index +
                                1}
                            </MenubarItem>
                          ),
                        )}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              {/* Format */}
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  MenubarContent{" "}
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className='size-4 mr-2' />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <BoldIcon className='size-4 mr-2' />
                        Bold{" "}
                        <MenubarShortcut>
                          ⌘B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon className='size-4 mr-2' />
                        Italic{" "}
                        <MenubarShortcut>
                          ⌘I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon className='size-4 mr-2' />
                        Underline{" "}
                        <MenubarShortcut>
                          ⌘U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon className='size-4 mr-2' />
                        Strike{" "}
                        <MenubarShortcut>
                          ⌘S
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <RemoveFormattingIcon className='size-4 mr-2' />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
