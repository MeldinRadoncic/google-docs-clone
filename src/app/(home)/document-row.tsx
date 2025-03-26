import { useRouter } from "next/navigation";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Building2Icon,
  CircleUserIcon,
} from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { DocumentMenu } from "./document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({
  document,
}: DocumentRowProps) => {
  // Open the document in a new tab Action
  const router = useRouter();

  

  // On row click handler
  const onRowClick = () => {
    router.push(
      `/documents/${document._id}`,
    );
  };

  // Open the document in a new tab Action
  const onNewTabClick = (
    id: string,
  ) => {
    window.open(
      `/documents/${id}`,
      "_blank",
    );
  };

  return (
    <TableRow
      key={document._id}
      onClick={onRowClick}
      className='cursor-pointer'>
      {/* Icon Table Cell */}
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>

      {/* Name Table Cell */}
      <TableCell className='truncate'>
        {document.title}
      </TableCell>

      {/* Shared Table Cell */}
      <TableCell className='hidden md:flex items=center gap-2'>
        {document.organizationId ? (
          <Building2Icon className='size-4' />
        ) : (
          <CircleUserIcon className='size-4' />
        )}
        {document.organizationId
          ? "Organization"
          : "Personal"}
      </TableCell>

      {/* Created At Table Cell */}
      <TableCell className='hidden md:table-cell'>
        {format(
          new Date(
            document._creationTime,
          ),
          "MMM dd, yyyy",
        )}
      </TableCell>

      {/* Actions Table Cell */}
      <TableCell className='w-[50px] text-right'>
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
