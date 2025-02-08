"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";
import {
  ColorResult,
  SketchPicker,
} from "react-color";
import { HighlighterIcon } from "lucide-react";

export const TextHighlightButton =
  () => {
    // The useEditorStore hook is used to access the editor instance from the store(global state).
    const { editor } = useEditorStore();
    const [
      currentColor,
      setCurrentColor,
    ] = useState<string>("");

    // Handle the color change event
    const handleColorChange = (
      color: ColorResult,
    ) => {
      editor
        ?.chain()
        .focus()
        .setHighlight({
          color: color.hex,
        })
        .run();
      setCurrentColor(color.hex);
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
            <span className='flex flex-col items-center'>
              <HighlighterIcon className='size-4' />
              <div
                className='h-0.5 w-full'
                style={{
                  backgroundColor:
                    currentColor,
                }}
              />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SketchPicker
            color={currentColor}
            onChange={handleColorChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
