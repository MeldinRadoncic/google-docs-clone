"use client";

import React from "react";
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  Printer,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlus,
  ListTodo,
  ListTodoIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FontFamilyButton } from "@/components/tiptapextensions/FontFamilyButton";
import { HeadingLevelButton } from "@/components/tiptapextensions/HeadingLevelButton";
import { TextHighlightButton } from "@/components/tiptapextensions/TextHighlightButton";
import { LinkButton } from "@/components/tiptapextensions/LinkButton";

import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { TextColorButton } from "@/components/tiptapextensions/TextColorButton";

// Define the props for the ToolbarButton component
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
// Define the ToolbarButton component
const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-300",
      )}>
      <Icon className='size-4' />
    </button>
  );
};

export const Toolbar = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();

  // Define the sections of the toolbar
  const sections: {
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
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .undo()
            .run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        // The onClick function is called when the button is clicked. It is used to redo the last action in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .redo()
            .run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        // The onClick function is called when the button is clicked. It is used to toggle the spell check feature in the editor.
        onClick: () => {
          const current =
            editor?.view.dom.getAttribute(
              "spellcheck",
            );
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true"
              ? "false"
              : "true",
          );
        },
      },
    ],
    // The second section of the toolbar
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive:
          editor?.isActive("bold"),
        // The onClick function is called when the button is clicked. It is used to toggle the bold text style in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .toggleBold()
            .run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive:
          editor?.isActive("italic"),
        // The onClick function is called when the button is clicked. It is used to toggle the italic text style in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .toggleItalic()
            .run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive(
          "underline",
        ),
        // The onClick function is called when the button is clicked. It is used to toggle the underline text style in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .toggleUnderline()
            .run(),
      },
    ],
    // The third section of the toolbar
    [
      {
        label: "Comment",
        icon: MessageSquarePlus,
        isActive: false,
        // The onClick function is called when the button is clicked. It is used to add a comment to the editor.
        onClick: () =>
          console.log("Comment"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive:
          editor?.isActive("taskList"),
        // The onClick function is called when the button is clicked. It is used to toggle the task list in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .toggleTaskList()
            .run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        isActive: false,
        // The onClick function is called when the button is clicked. It is used to remove all formatting from the selected text in the editor.
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .unsetAllMarks()
            .run(),
      },
    ],
  ];

  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      {/* The FontFamilyButton component is used to add a dropdown menu to the toolbar for selecting the font family of the text in the editor. */}
      <Separator
        orientation='vertical'
        className='h-6 mx-1 bg-neutral'
      />
      <FontFamilyButton />
      {/* The HeadingLevelButton component is used to add a dropdown menu to the toolbar for selecting the heading level of the text in the editor. */}
      <Separator
        orientation='vertical'
        className='h-6 mx-1 bg-neutral'
      />
      <HeadingLevelButton />
      
      <Separator
        orientation='vertical'
        className='h-6 mx-1 bg-neutral'
      />
      {/*  The second section of the toolbar */}
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      {/* The TextColorButton component is used to add a color picker to the toolbar for selecting the text color in the editor. */}
      <TextColorButton />
      {/* The TextHighlightButton component is used to add a color picker to the toolbar for highlighting the text in the editor. */}
      <TextHighlightButton />

      {/* The LinkButton component is used to add a button to the toolbar for adding a link to the selected text in the editor. */}
      <LinkButton />

      {/* The third section of the toolbar */}
      <Separator
        orientation='vertical'
        className='h-6 mx-1 bg-neutral'
      />
      {sections[2].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
};
