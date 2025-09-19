import React from "react";
import CustomSheet from "../../../../reusables/CustomSheet";
import { useNavbarData } from "../../hooks/useNavbarData";
import { useMobileNav } from "./hooks/useMobileNav";
import { CategorySection } from "./components/mobile-nav/CategorySection";
import { HowItWorksSection } from "./components/mobile-nav/HowItWorksSection";
import { UserProfile } from "./components/mobile-nav/UserProfile";
import { ActionButtons } from "./components/mobile-nav/ActionButtons";
import { X } from "lucide-react";

interface MobileNavbarProps {
  showMobileNav: boolean;
  toggleMobileNav: () => void;
  isAuth: boolean;
  user: IUser | undefined;
  onLogout: () => void;
}

export default function MobileNavbar({
  showMobileNav,
  toggleMobileNav,
  isAuth,
  user,
  onLogout,
}: MobileNavbarProps) {
  const { categoryGroups, isLoading } = useNavbarData();
  const { notifications, handleLogout, handleNavClick } = useMobileNav(
    onLogout,
    toggleMobileNav
  );

  return (
    <CustomSheet
      open={showMobileNav}
      onOpenChange={toggleMobileNav}
      side="right"
      showCloseIcon={false}
      className="bg-white p-0 sm:max-w-sm w-full"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 bg-white flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-primary">Menu</h2>
          <button onClick={toggleMobileNav}>
            <X className="w-6 h-6 text-black-2" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <CategorySection
            categoryGroups={categoryGroups}
            isLoading={isLoading}
            onNavClick={handleNavClick}
          />

          <HowItWorksSection onNavClick={handleNavClick} />

          {isAuth && user && (
            <UserProfile
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onNavClick={handleNavClick}
            />
          )}
        </div>

        {/* Action Buttons */}
        <ActionButtons
          user={user}
          isAuth={isAuth}
          onNavClick={handleNavClick}
        />
      </div>
    </CustomSheet>
  );
}
