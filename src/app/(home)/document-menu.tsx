import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  ExternalLinkIcon,
  TrashIcon,
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
        <DropdownMenuItem>
          Edit
        </DropdownMenuItem>
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
