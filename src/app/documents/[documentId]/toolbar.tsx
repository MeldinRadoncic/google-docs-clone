'use client';

import React from 'react'
import { LucideIcon, Undo2Icon } from 'lucide-react'
import { cn } from '@/lib/utils';

import { useEditorStore } from '@/store/use-editor-store';

// Define the props for the ToolbarButton component
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
// Define the ToolbarButton component
const ToolbarButton = ({ onClick, isActive, icon: Icon}: ToolbarButtonProps) => {

  return(
    <button
    onClick={onClick}
    className={cn('text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
      isActive && 'bg-neutral-200/80'
    )}
    >
      <Icon className='size-4'/>
    </button>
  )
}

export const Toolbar = () => { 
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();

  // Define the sections of the toolbar
  const sections:{
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;

  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        // The onClick function is called when the button is clicked. It is used to undo the last action in the editor.
        onClick: () => editor?.chain().focus().undo().run(),
        
      }
    ]
  ];
  
  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
    </div>
  )
}

