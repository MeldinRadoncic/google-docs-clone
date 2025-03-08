import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className='flex-1 flex items-center justify-center'>
      <form
        action=''
        className='relative max-w-[720px] w-full'>
        <Input
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
      </form>
    </div>
  );
};
