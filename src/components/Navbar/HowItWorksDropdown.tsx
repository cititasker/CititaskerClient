import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROLE, ROUTES } from "@/constant";

export default function HowItWorksDropdown() {
  return (
    <li>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-base font-normal px-3 hover:bg-transparent hover:text-primary"
          >
            How it works
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={13}
          className="p-0 rounded-t-none border-none"
        >
          <DropdownMenuItem
            asChild
            className="py-2.5 px-3 hover:text-primary font-normal rounded-none"
          >
            <Link href={`${ROUTES.HOW_IT_WORKS}/${ROLE.poster}`}>
              For Poster
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="py-2.5 px-3 hover:text-primary font-normal rounded-none"
          >
            <Link href={`${ROUTES.HOW_IT_WORKS}/${ROLE.tasker}`}>
              For Tasker
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
