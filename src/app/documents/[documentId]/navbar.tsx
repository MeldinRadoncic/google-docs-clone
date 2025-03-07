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
import { useEditorStore } from "@/store/use-editor-store";

export const Navbar = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();

  if (!editor) return null; // Avoid hydration issues by returning null if the editor instance is not available.

  // insert Table function
  const insertTable = (
    rows: number,
    cols: number,
  ) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols })
      .run();
  };
  // onDownload function
  const onDownload = (
    blob: Blob,
    fileName: string,
  ) => {
    const url =
      URL.createObjectURL(blob);
    const a =
      document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Revoke the object URL after the download
  };

  // on Save JSON function
  const onSaveJson = () => {
    if (!editor) return;

    const json = editor.getJSON();
    const blob = new Blob(
      [JSON.stringify(json)],
      {
        type: "application/json",
      },
    );
    onDownload(blob, "document.json"); // TODO: use document title from database
  };

  // on Save HTML function
  const onSaveHtml = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], {
      type: "text/html",
    });
    onDownload(blob, "document.html"); // TODO: use document title from database
  };

  // on Save Text function
  const onSaveText = () => {
    if (!editor) return;
    const text = editor.getText();
    const blob = new Blob([text], {
      type: "text/plain",
    });
    onDownload(blob, "document.txt"); // TODO: use document title from database
  };

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
                      <MenubarItem
                        onClick={
                          onSaveJson
                        }>
                        <FileJsonIcon className='size-4 mr-2' />
                        JSON
                      </MenubarItem>
                      {/* HTML */}
                      <MenubarItem
                        onClick={
                          onSaveHtml
                        }>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      {/* PDF */}
                      <MenubarItem
                        onClick={
                          window.print
                        }>
                        <BsFilePdf className='size-4 mr-2' />
                        PDF
                      </MenubarItem>
                      {/* Text */}
                      <MenubarItem
                        onClick={
                          onSaveText
                        }>
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
                  <MenubarItem
                    onClick={() =>
                      editor
                        ?.chain()
                        .focus()
                        .undo()
                        .run()
                    }>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo{" "}
                    <MenubarShortcut>
                      ⌘Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() =>
                      editor
                        ?.chain()
                        .focus()
                        .redo()
                        .run()
                    }>
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
                              }
                              onClick={() =>
                                insertTable(
                                  index +
                                    1,
                                  index +
                                    1,
                                )
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
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleBold()
                            .run()
                        }>
                        <BoldIcon className='size-4 mr-2' />
                        Bold{" "}
                        <MenubarShortcut>
                          ⌘B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleItalic()
                            .run()
                        }>
                        <ItalicIcon className='size-4 mr-2' />
                        Italic{" "}
                        <MenubarShortcut>
                          ⌘I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                        }>
                        <UnderlineIcon className='size-4 mr-2' />
                        Underline{" "}
                        <MenubarShortcut>
                          ⌘U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleStrike()
                            .run()
                        }>
                        <StrikethroughIcon className='size-4 mr-2' />
                        Strike{" "}
                        <MenubarShortcut>
                          ⌘S
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor
                        ?.chain()
                        .focus()
                        .unsetAllMarks()
                        .run()
                    }>
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
