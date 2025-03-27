import React from "react";

import { Navbar } from "./navbar";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
import { Room } from "./room";

// Define the shape of the URL query parameters
interface DocumentIdProps {
  params: { documentId: string };
}

const DocumentIdPage = ({
  params,
}: DocumentIdProps) => {
  const { documentId } = params;

  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0'>
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
};

export default DocumentIdPage;
