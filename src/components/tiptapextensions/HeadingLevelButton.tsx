"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { cn } from "@/lib/utils";

export const HeadingLevelButton =
  () => {
    const { editor } = useEditorStore();
    const [open, setOpen] =
      useState(false); // State to control dropdown

      // Define the levels of headings
    const levels = [
      {
        label: "Normal Text",
        value: 0,
        fontSize: "16px",
      },
      {
        label: "Heading 1",
        value: 1,
        fontSize: "32px",
      },
      {
        label: "Heading 2",
        value: 2,
        fontSize: "24px",
      },
      {
        label: "Heading 3",
        value: 3,
        fontSize: "20px",
      },
      {
        label: "Heading 4",
        value: 4,
        fontSize: "18px",
      },
      {
        label: "Heading 5",
        value: 5,
        fontSize: "16px",
      },
      {
        label: "Heading 6",
        value: 6,
        fontSize: "14px",
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
              open && "bg-neutral-300",
            )}>
            <span className='flex items-center truncate'>
              {editor?.getAttributes(
                "heading",
              ).heading ||
                "Normal Text"}
              <ChevronDown className='size-4' />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {levels.map((level) => (
            <button
              key={level.value}
              // The onClick function is called when the button is clicked. It is used to toggle the heading level in the editor.
              onClick={() => {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({
                    level: level.value,
                  })
                  .run();
                setOpen(false);
              }}
              className={cn(
                "text-sm h-7 gap-x-2 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                editor?.isActive(
                  "heading",
                  {
                    level: level.value,
                  },
                ) && "bg-neutral-300",
              )}
              style={{
                fontSize:
                  level.fontSize,
              }}>
              {level.label}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
