import { useState, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useMobileNav = (
  onLogout: () => void,
  toggleMobileNav: () => void
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications] = useState(2);
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    await onLogout();
    queryClient.clear();
    toggleMobileNav();
  }, [onLogout, queryClient, toggleMobileNav]);

  const handleNavClick = useCallback(() => {
    toggleMobileNav();
  }, [toggleMobileNav]);

  return {
    searchTerm,
    setSearchTerm,
    notifications,
    handleLogout,
    handleNavClick,
  };
};
