import { PlaceOption } from "@/hooks/useGooglePlacesAutocomplete";
import { CommandItem } from "@/components/ui/command";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  options: PlaceOption[];
  onSelect: (option: PlaceOption) => void;
}

export const GooglePlacesResultsList = ({ options, onSelect }: Props) => {
  return (
    <>
      {options.map((opt, idx) => (
        <CommandItem
          key={idx}
          onSelect={() => onSelect(opt)}
          className="cursor-pointer flex gap-2 items-start"
        >
          <FaMapMarkerAlt className="text-muted-foreground mt-1" />
          <div className="text-left">
            <p className="text-sm font-medium">
              {opt.structured_formatting.main_text}
            </p>
            <p className="text-xs text-muted-foreground">
              {opt.structured_formatting.secondary_text}
            </p>
          </div>
        </CommandItem>
      ))}
    </>
  );
};
