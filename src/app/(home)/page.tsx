"use client";

import { Navbar } from "@/app/(home)/navbar";
import { TemplatesGallery } from "@/app/(home)/templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "@/app/(home)/documents-table";

const Home = () => {
  const { results, status, loadMore } =
    usePaginatedQuery(
      api.documents.get,
      {},
      { initialNumItems: 5 },
    );

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='fixed top-0 left-0 right-0 h-16 z-10 bg-white p-4'>
        <Navbar />
      </div>

      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </main>
  );
};

export default Home;
