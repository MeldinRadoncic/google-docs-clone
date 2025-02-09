import React from 'react'
import { useEditorStore } from '@/store/use-editor-store'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'


export const AlignButton = () => {
    // The useEditorStore hook is used to access the editor instance from the store(global state).
    const { editor } = useEditorStore();
    
    // Define the alignments for the text
    const alignments = [
        {
            label: 'Align Left',
            icon: AlignLeftIcon,
            value : 'left',
        },
        {
            label: 'Align Center',
            icon: AlignCenterIcon,
            value : 'center',
        },
        {
            label: 'Align Right',
            icon: AlignRightIcon,
            value : 'right',
        },
    ]
  
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
                    <AlignLeftIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={5}>
                <div className='flex p-2'>
                    {alignments.map((alignment, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                editor?.chain().focus().setTextAlign(alignment.value).run()
                            }}
                            title={alignment.label}
                            className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
                            <alignment.icon className='size-4' />
                        </button>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

