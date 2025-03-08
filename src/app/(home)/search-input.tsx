"use client";
import {
  useState,
  useRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "@/hooks/use-search-param";
import {
  SearchIcon,
  XIcon,
} from "lucide-react";

export const SearchInput = () => {
  // initialize search and setSearch using useSearchParams custom hook
  const [search, setSearch] =
    useSearchParams("search");
  const [value, setValue] =
    useState("");
  const inputRef =
    useRef<HTMLInputElement>(null);
  // On Change function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(e.target.value);
  };

  // Handle Clear function
  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  // Handle Submit function
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className='flex-1 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='relative max-w-[720px] w-full'>
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder='Search'
          className='md:text-base placeholder:text-natural-800 px-14 w-full border-none focus-visible:shadow-[0 0 0 2px rgba(66,153,225,0.5)] bg-[#F9FAFB] rounded-full h-[48px] focus-visible:ring-0 focus-bg-white'
        />
        <Button
          type='submit'
          variant='ghost'
          size='icon'
          className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
          <SearchIcon size={24} />
        </Button>
        {value && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handleClear}
            className='absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
            <XIcon size={24} />
          </Button>
        )}
      </form>
    </div>
  );
};
