"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import {
  type ColorResult,
  CirclePicker,
} from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TextColorButton = () => {
  const [
    currentColor,
    setCurrentColor,
  ] = useState<string>("#000000");
  const [open, setOpen] =
    useState<boolean>(false);
  const { editor } = useEditorStore();

  // Function to handle color change
  const handleColorChange = (
    color: ColorResult,
  ) => {
    editor
      ?.chain()
      .focus()
      .setColor(color.hex)
      .run();
    setCurrentColor(color.hex);
    setOpen(false);
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className='text-sm h-0.5 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
          <span className='text-neutral-900'>
            A
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
        <CirclePicker
          color={currentColor}
          onChange={handleColorChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
