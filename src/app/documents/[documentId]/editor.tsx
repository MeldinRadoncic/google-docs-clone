"use client";

import React from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TextAlign from "@tiptap/extension-text-align";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";

// import custom extensions
import { FontSize } from "@/components/tiptapextensions/customextensions/font-size";
import { LineHeight } from "@/components/tiptapextensions/customextensions/line-height";

import { useEditorStore } from "@/store/use-editor-store";
import { Ruler } from "./ruler";
// import Threads component for the comments
import { Threads } from "./threads";

export const Editor = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { setEditor } =
    useEditorStore();

  const liveblocks =
    useLiveblocksExtension();

  // The useEditor hook is used to create a new editor instance with the specified configuration. See the docs for more information: www.tiptap.dev/docs/editor/getting-started/install/nextjs
  const editor = useEditor({
    immediatelyRender: false, // The immediatelyRender option is used to disable the immediate rendering of the editor and avoid hydration issues.
    editorProps: {
      attributes: {
        style:
          "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      FontSize,
      liveblocks,
      LineHeight,
      Link.configure({
        openOnClick: true,
        autolink: true,
        protocols: ["https"],
      }),
      ListItem,
      ListKeymap.configure({
        listTypes: [
          {
            itemName: "listItem",
            wrapperNames: [
              "bulletList",
              "orderedList",
            ],
          },
        ],
      }),

      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      TaskList,
      Image,
      ImageResize,
      Dropcursor,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Underline,
    ],
    // The onCreate function is called when the editor is created. It is used to set the editor instance in the store(global state).
    onCreate: ({ editor }) =>
      setEditor(editor),
    // The Clean up function.
    onDestroy: () => setEditor(null),
    // The onUpdate function is called when the editor is updated.
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    // The onSelectionUpdate function is called when the selection is updated.
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    // The onTransaction function is called when a transaction is made.
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    // The onFocus function is called when the editor is focused.
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    // The onBlur function is called when the editor is blurred.
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    // The onError function is called when an error occurs.
    onContentError: ({ editor }) => {
      setEditor(editor);
    },

    content: `Start typing...`,
  });

  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:overflow-visible print:bg-white'>
      {/* The Ruler component is used to display the ruler at the top of the editor. */}
      <Ruler />

      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent
          editor={editor}
        />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
