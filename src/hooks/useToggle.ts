import { UseToggleReturn } from "@/constant/interface";
import { useState, useCallback } from "react";

export default function useToggle(v?: boolean): UseToggleReturn {
  const [isOpen, setIsOpen] = useState<boolean>(v || false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    handleOpen,
    handleClose,
    toggle,
  };
}
