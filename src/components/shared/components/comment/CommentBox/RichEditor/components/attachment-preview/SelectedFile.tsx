import Image from "next/image";
import { X } from "lucide-react";
import { BsFilePdfFill } from "react-icons/bs";
import { LuFile } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { truncate } from "@/utils";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface IProps {
  file: File;
  onClick: () => void;
}

export default function SelectedFile({ file, onClick }: IProps) {
  const isImage = file.type.startsWith("image/");
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const preview = URL.createObjectURL(file);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Card
      className={cn(
        "relative group flex items-center gap-2 rounded-md border shrink-0 cursor-pointer select-none",
        isImage ? "p-1" : "p-2 bg-gray-700"
      )}
    >
      {isImage ? (
        <Image
          src={preview}
          alt={file.name}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <>
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-sm",
              ext === "pdf" ? "bg-destructive" : "bg-blue-500"
            )}
          >
            {ext === "pdf" ? (
              <BsFilePdfFill color="white" />
            ) : (
              <LuFile color="white" />
            )}
          </div>
          <div className="text-white">
            <p className="text-sm font-medium">{truncate(file.name, 14)}</p>
            <p className="text-xs uppercase text-gray-100">{ext}</p>
          </div>
        </>
      )}
      <button
        onClick={onClick}
        className="hidden group-hover:flex absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 border items-center justify-center"
      >
        <X size={14} />
      </button>
    </Card>
  );
}
