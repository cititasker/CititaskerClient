import { cn } from "@/utils";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdTune } from "react-icons/md";

interface IProps {
  extraClass?: string;
}
const Search = ({ extraClass }: IProps) => {
  return (
    <form
      className={cn(
        "rounded-[50px] flex items-center justify-between py-1 pr-1 pl-[18px] max-w-[53.75rem] w-full bg-white",
        extraClass
      )}
    >
      <div className="relative flex items-center gap-x-4 flex-1">
        <IoSearchSharp className="text-2xl" />
        <input
          type="text"
          className=" placeholder:text-dark-grey-2 text-sm h-full w-full outline-none border-none"
          placeholder="What task do you want to get done?"
        />
      </div>

      <button className="w-[3.25rem] h-[3.25rem] rounded-full flex justify-center items-center bg-primary">
        <MdTune className="text-2xl text-white" />
      </button>
    </form>
  );
};

export default Search;
