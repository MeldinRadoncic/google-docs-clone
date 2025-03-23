import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";

import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents:
    | Doc<"documents">[]
    | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  status,
  loadMore,
}: DocumentsTableProps) => {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
      {documents === undefined ? (
        <div className='flex justify-center items-center h-24'>
          <LoaderIcon className='animate-spin text-muted-foreground size-5' />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='border-none'>
              <TableHead className='w-[50px]'></TableHead>
              <TableHead>
                Name
              </TableHead>
              <TableHead className='hidden md:table-cell'>
                Shared
              </TableHead>
              <TableHead className='hidden md:table-cell'>
                Created At
              </TableHead>
              <TableHead className='w-[50px] text-right'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center h-24'>
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              documents
                .map((document) => (
                  <DocumentRow
                    key={document._id}
                    document={document}
                  />
                ))
                .reverse()
            )}
          </TableBody>
        </Table>
      )}
      <div className='flex items-center justify-center'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => loadMore(5)}
          disabled={
            status !== "CanLoadMore"
          }>
          {status === "CanLoadMore"
            ? "Load More"
            : "End of List"}
        </Button>
      </div>
    </div>
  );
};
