"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const ImageButton = () => {
  // The useEditorStore hook is used to access the editor instance from the store(global state).
  const { editor } = useEditorStore();
  const [
    isDialogOpen,
    setIsDialogOpen,
  ] = useState<boolean>(false);
  const [imageUrl, setImageUrl] =
    useState<string>("");

  // Handle the image upload event when the user uploads an image
  const handleImageUpload = (
    src: string,
  ) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src })
      .run();
  };

  // Handle the image change event when the user selects a new image
  const handleImageOnChange = () => {
    // Create a new input element to allow the user to select an image
    const input =
      document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    // Listen for the change event when the user selects an image
    input.onchange = (e) => {
      const file = (
        e.target as HTMLInputElement
      ).files?.[0];
      if (file) {
        const imageUrl =
          URL.createObjectURL(file);
        handleImageUpload(imageUrl);
      }
    };
    input.click();
  };

  // Handle the image URL submit event when the user enters an image URL
  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      handleImageUpload(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className='text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'>
            <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <button
            onClick={
              handleImageOnChange
            }
            className='flex items-center w-full px-2 py-1 text-sm text-left hover:bg-neutral-100'>
            Upload Image
          </button>
          <button
            onClick={() =>
              setIsDialogOpen(true)
            }
            className='flex items-center w-full px-2 py-1 text-sm text-left hover:bg-neutral-100'>
            Enter Image URL
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() =>
          setIsDialogOpen(false)
        }>
        <DialogContent>
          <DialogHeader>
            Enter Image URL
          </DialogHeader>
          <Input
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(
                e.target.value,
              )
            }
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleImageUrlSubmit();
                }
            }}
            placeholder='Enter Image URL'
          />
          <DialogFooter>
            <Button
              onClick={
                handleImageUrlSubmit
              }>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
