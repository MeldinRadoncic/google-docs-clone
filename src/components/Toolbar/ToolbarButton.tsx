'use client';
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Define the props for the ToolbarButton component
interface ToolbarButtonProps {
    label: string;
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-300",
      )} title={label}>
      <Icon className='size-4' />
    </button>
  );
};