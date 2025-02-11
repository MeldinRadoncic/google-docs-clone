"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";

const FONT_SIZES = [
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "68",
  "72",
];

export const FontSizeButton = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();

  const [fontSize, setFontSize] =
    useState<string>("16");

  if (!editor) return null; // Return null if editor is not available to avoid hydration error

  // Get Current Font Size
  const currentFontSize =
    editor
      ?.getAttributes("textStyle")
      .fontSize?.replace("px", "") ||
    fontSize;

  // Update Font Size
  const updateFontSize = (
    newSize: string,
  ) => {
    const parsedSize =
      parseInt(newSize);
    if (
      !isNaN(parsedSize) &&
      parsedSize > 0
    ) {
      editor
        ?.chain()
        .focus()
        .setFontSize(`${parsedSize}px`)
        .run();
      setFontSize(newSize);
    }
  };

  // Increase & Decrease Font Size
  const handleIncreaseFontSize = () => {
    updateFontSize(
      (
        parseInt(currentFontSize) + 1
      ).toString(),
    );
  };

  // Decrease Font Size
  const handleDecreaseFontSize = () => {
    const newSize =
      parseInt(currentFontSize) - 1;
    if (newSize > 0) {
      updateFontSize(
        newSize.toString(),
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center gap-1 px-3 py-1 rounded hover:bg-neutral-200'>
          <span className='text-sm'>
            A
          </span>
          <span className='text-sm'>
            {currentFontSize}px
          </span>
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-24'>
        {/* Increase & Decrease Buttons */}
        <div className='flex items-center justify-between p-2'>
          <button
            onClick={
              handleDecreaseFontSize
            }
            className='p-1 rounded hover:bg-gray-200'>
            <Minus size={16} />
          </button>
          <span className='text-sm'>
            {currentFontSize}px
          </span>
          <button
            onClick={
              handleIncreaseFontSize
            }
            className='p-1 rounded hover:bg-gray-200'>
            <Plus size={16} />
          </button>
        </div>

        {/* Predefined Font Sizes */}
        {FONT_SIZES.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() =>
              updateFontSize(size)
            }
            className='cursor-pointer'>
            {size}px
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
