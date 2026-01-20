import Link from "next/link";
import { Share, Flag, Bookmark, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomDropdown from "@/components/reusables/CustomDropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const HEADER_ACTIONS = [
  { icon: Share, label: "Share task", key: "share" },
  { icon: Flag, label: "Report task", key: "report" },
  { icon: Bookmark, label: "Save task", key: "bookmark" },
] as const;

export const TaskHeader = ({
  back,
  onAction,
}: {
  back: string;
  onAction: (key: string) => void;
}) => {
  return (
    <div className="sticky top-0 z-20 bg-background border-b border-border-light">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        <Link
          href={back}
          scroll={false}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden md:inline font-medium">Back to Map</span>
          <span className="md:hidden font-medium">Back</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-1">
          {HEADER_ACTIONS.map(({ icon: Icon, label, key }) => (
            <Button
              key={key}
              variant="ghost"
              size="sm"
              onClick={() => onAction(key)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <CustomDropdown>
            {HEADER_ACTIONS.map(({ icon: Icon, label, key }) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onAction(key)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </DropdownMenuItem>
            ))}
          </CustomDropdown>
        </div>
      </div>
    </div>
  );
};
