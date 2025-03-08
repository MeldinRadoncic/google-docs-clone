import React from "react";
import Link from "next/link";

const Documents = () => {
  return (
    <div>
      <h1 className='text-4xl'>
        All Documents
      </h1>
      <Link
        className=' text-2xl bg-blue-400 flex justify-center'
        href='/documents/123'>
        Go to Id Document
      </Link>
    </div>
  );
};

export default Documents;
