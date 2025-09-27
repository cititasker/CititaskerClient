import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constant";

export const useMobileNav = (
  onLogout: () => void,
  toggleMobileNav: () => void
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications] = useState(2);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await onLogout();
      toggleMobileNav();
      window.location.href = ROUTES.LOGIN;
    } catch (error) {
      toggleMobileNav();
      window.location.href = ROUTES.LOGIN;
    }
  }, [onLogout, toggleMobileNav, router]);

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
