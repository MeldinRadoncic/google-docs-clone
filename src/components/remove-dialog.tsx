"use client";

import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface REmoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

export const RemoveDialog = ({
  documentId,
  children,
}: REmoveDialogProps) => {
  const [isRemoving, setIsRemoving] =
    useState(false);
    

  // Call the removeById mutation from the documents API
  const remove = useMutation(
    api.documents.removeById,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        onClick={(e) =>
          e.stopPropagation()
        }>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be
            undone. Are you sure you
            want to delete this
            document?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) =>
              e.stopPropagation()
            }>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              remove({
                id: documentId,
              })
              .catch(() => toast.error('Something went wrong'))
              .then(() => toast.success('Document deleted'))
              .finally(() => {
                setIsRemoving(false);
              });
            }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
