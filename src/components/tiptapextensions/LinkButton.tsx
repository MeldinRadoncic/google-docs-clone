"use client";

import {
  useState,
  useEffect,
} from "react";
import Link from "next/link";
import { useEditorStore } from "@/store/use-editor-store";
import { LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export const LinkButton = () => {
  const { editor } = useEditorStore();
  const [url, setUrl] =
    useState<string>("");
  const [showTooltip, setShowTooltip] =
    useState<boolean>(false);
  const [open, setOpen] =
    useState<boolean>(false);

  const currentLink =
    editor?.getAttributes("link")?.href;

    // Set the URL when the link changes
  useEffect(() => {
    setUrl(currentLink);
  }, [currentLink]);

  // Normalize the URL to include the protocol
  const normalizeUrl = (
    href: string,
  ) => {
    if (
      !href.startsWith("http://") &&
      !href.startsWith("https://")
    ) {
      return `https://${href}`;
    }
    return href;
  };
  // Handle the link change
  const handleLinkChange = (
    href: string,
  ) => {
    const validUrl = normalizeUrl(
      href.trim(),
    );
    if (!validUrl) return;
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: validUrl })
      .run();
    setShowTooltip(false);
    setOpen(false);
  };

  // Handle the keydown event
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      handleLinkChange(url);
    }
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
        title='Link'
          className='relative text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80'
          onMouseEnter={() =>
            currentLink &&
            setShowTooltip(true)
          }
          onMouseLeave={() =>
            setShowTooltip(false)
          }>
          <LinkIcon className='size-4' />
          {showTooltip &&
            currentLink && (
              <span className='bg-black text-white text-xs px-2 py-1 rounded'>
                <Link
                  href={normalizeUrl(
                    currentLink,
                  )}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {currentLink}
                </Link>
              </span>
            )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='p-4 space-y-4'>
          <Input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder='Paste or type a link'
          />
          <Button
            onClick={() =>
              handleLinkChange(url)
            }
            className='w-full primary'>
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
