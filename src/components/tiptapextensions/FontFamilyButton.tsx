"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export const FontFamilyButton = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();
  const [open, setOpen] =
    useState(false); // State to control dropdown

  const fonts = [
    { label: "Arial", value: "Arial" },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Impact",
      value: "Impact",
    },
    {
      label: "Tahoma",
      value: "Tahoma",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Lucida Console",
      value: "Lucida Console",
    },
    {
      label: "Montserrat",
      value: "Montserrat",
    },
  ];

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
          )} title='Font'>
          <span className='text-sm flex justify-items-center items-center truncate'>
            {editor?.getAttributes(
              "textStyle",
            ).fontFamily || "Arial"}
            <ChevronDown className='size-4 ml-1' />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='p-2'>
          {fonts.map((font) => (
            <button
              key={font.value}
              //   The onClick function is called when the button is clicked. It is used to set the font family of the selected text in the editor.
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .setFontFamily(
                    font.value,
                  )
                  .run();
                setOpen(false); // Close dropdown after selecting font
              }}
              className={cn(
                "text-sm h-7 gap-x-2 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                editor?.isActive(
                  "textStyle",
                  {
                    fontFamily:
                      font.value,
                  },
                ) && "bg-neutral-300",
              )}
              style={{
                fontFamily: font.label,
              }}>
              {font.label}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
