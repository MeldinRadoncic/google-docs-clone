"use client";

import { Navbar } from "@/app/(home)/navbar";
import { TemplatesGallery } from "@/app/(home)/templates-gallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  const documents = useQuery(
    api.documents.get,
  );
  if (document === undefined) {
    <p>Loading...</p>;
  }

  console.log("DOCUMENTS ", documents);

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='fixed top-0 left-0 right-0 h-16 z-10 bg-white p-4'>
        <Navbar />
      </div>

      <div className='mt-16'>
        <TemplatesGallery />
      </div>
      {documents?.map((document) => (
        <div key={document._id}>
          {document.title}
        </div>
      ))}
    </main>
  );
};

export default Home;
