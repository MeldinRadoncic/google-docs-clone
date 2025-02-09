"use client";

import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  ListIcon,
  ListOrdered,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ListItemButton = () => {
  const { editor } = useEditorStore();

  if (!editor) return null; // Ensures the editor instance is available

  const handleBulletList = () => {
    editor
      .chain()
      .focus()
      .toggleBulletList()
      .run();
  };

  const handleOrderedList = () => {
    editor
      .chain()
      .focus()
      .toggleOrderedList()
      .run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
          title='Toggle List'>
          <ListIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        className='bg-white shadow-md rounded-md p-1'>
        <div className='flex flex-col'>
          <button
            onClick={handleBulletList}
            className='flex items-center gap-2 p-2 w-full text-sm hover:bg-neutral-200/80 pointer'
            title='Bullet List'>
            <ListIcon className='size-4' />{" "}
            Bullet List
          </button>
          <button
            onClick={handleOrderedList}
            className='flex items-center gap-2 p-2 w-full text-sm hover:bg-neutral-200/80'
            title='Ordered List'>
            <ListOrdered className='size-4' />{" "}
            Ordered List
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
