"use client";

import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface EditDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

export const EditDialog = ({
  documentId,
  children,
  initialTitle,
}: EditDialogProps) => {
  const [isEditing, setIsEditing] =
    useState(false);
  const [title, setTitle] = useState(
    initialTitle,
  );
  const [open, setOpen] =
    useState(false);

  // Call the removeById mutation from the documents API
  const update = useMutation(
    api.documents.updateById,
  );

  // onSubmit handler
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsEditing(true);
    update({
      id: documentId,
      title:
        title.trim() ||
        "Untitled Document",
    })
    .catch(() => toast.error("Failed to update document"))
    .then(() => toast.success("Document updated"))
      .then(() => {
        setOpen(false);
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        onClick={(e) =>
          e.stopPropagation()
        }>
        <form
          onSubmit={onSubmit}
          className='className'>
          <DialogHeader>
            <DialogTitle>
              Edit Document
            </DialogTitle>
            <DialogDescription>
              Edit the document here.
            </DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder='Document Title'
              disabled={isEditing}
              onClick={(e) =>
                e.stopPropagation()
              }
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='ghost'
              disabled={isEditing}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isEditing}
              onClick={(e) =>
                e.stopPropagation()
              }>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
