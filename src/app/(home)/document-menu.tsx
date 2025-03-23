import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ExternalLinkIcon,
  TrashIcon,
  FilePenIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (
    id: Id<"documents">,
  ) => void;
}
import { RemoveDialog } from "@/components/remove-dialog";
import { EditDialog } from "@/components/edit-dialog";

export const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'>
          <MoreVertical size={4} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            onNewTab(documentId)
          }>
          <ExternalLinkIcon />
          Open in new tab
        </DropdownMenuItem>
        <EditDialog
          initialTitle={title}
          documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) =>
              e.preventDefault()
            }
            onClick={(e) =>
              e.stopPropagation()
            }>
            <FilePenIcon className='size-4' />
            Edit
          </DropdownMenuItem>
        </EditDialog>
        <RemoveDialog
          documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) =>
              e.preventDefault()
            }
            onClick={(e) =>
              e.stopPropagation()
            }>
            <TrashIcon className='size-4 text-red-800' />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
