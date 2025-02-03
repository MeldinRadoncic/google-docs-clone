"use client";

import React from "react";
import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import Dropcursor from '@tiptap/extension-dropcursor'



export const Editor = () => {
    // The useEditor hook is used to create a new editor instance with the specified configuration. See the docs for more information: www.tiptap.dev/docs/editor/getting-started/install/nextjs
  const editor = useEditor({
    editorProps: {
      attributes: {
        style:
          "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [StarterKit,
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
    ],

    content:  `
    <p>This is a basic example of implementing images. Drag to re-order.</p>
    <img src="https://placehold.co/800x400" />
    <img src="https://placehold.co/800x400/6A00F5/white" />
  `
  });

  return (
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:overflow-visible print:bg-white'>
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent
          editor={editor}
        />
      </div>
    </div>
  );
};
