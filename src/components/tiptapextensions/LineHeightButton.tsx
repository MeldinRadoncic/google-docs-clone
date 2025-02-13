"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  ChevronDown,
  Plus,
  Minus,
  ListCollapseIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const LINE_HEIGHTS = [
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
];

export const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const [lineHeight, setLineHeight] =
    useState<string>("1");

  if (!editor) return null; // Return null if editor is not available to avoid hydration error

  // Get current line height and format it to one decimal place
  const currentLineHeight = (
    parseFloat(
      editor?.getAttributes("textStyle")
        .lineHeight,
    ) || parseFloat(lineHeight)
  ).toFixed(1);

  // Update Line Height
  const updateLineHeight = (
    newSize: string,
  ) => {
    const parsedSize =
      parseFloat(newSize).toFixed(1); // Format to one decimal place
    editor
      ?.chain()
      .focus()
      .setLineHeight(parsedSize)
      .run();
    setLineHeight(parsedSize);
  };

  // Increase Line Height
  const handleIncrease = () => {
    updateLineHeight(
      (
        parseFloat(currentLineHeight) +
        0.1
      ).toFixed(1),
    ); // Increase by 0.1
  };

  // Decrease Line Height
  const handleDecrease = () => {
    const newSize = (
      parseFloat(currentLineHeight) -
      0.1
    ).toFixed(1); // Decrease by 0.1
    if (parseFloat(newSize) > 0) {
      updateLineHeight(newSize);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
          title='Line Height'>
          <span className='text-xs flex items-center gap-1'>
            <ListCollapseIcon className='size-4' />
            {currentLineHeight}
            <ChevronDown className='size-4' />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}>
        {/* Line Height Selection Dropdown */}
        {LINE_HEIGHTS.map((lh) => (
          <DropdownMenuItem
            key={lh}
            onClick={() =>
              updateLineHeight(lh)
            }>
            {lh}
          </DropdownMenuItem>
        ))}
        <div className='flex p-2'>
          <button
            onClick={handleIncrease}
            title='Increase Line Height'
            className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
            <Plus className='size-4' />
          </button>
          <button
            onClick={handleDecrease}
            title='Decrease Line Height'
            className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
            <Minus className='size-4' />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
