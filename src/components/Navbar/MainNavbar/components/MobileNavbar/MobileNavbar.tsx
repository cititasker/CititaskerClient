import React from "react";
import CustomSheet from "../../../../reusables/CustomSheet";
import { useNavbarData } from "../../hooks/useNavbarData";
import { useMobileNav } from "./hooks/useMobileNav";
import { CategorySection } from "./components/mobile-nav/CategorySection";
import { HowItWorksSection } from "./components/mobile-nav/HowItWorksSection";
import { UserProfile } from "./components/mobile-nav/UserProfile";
import { ActionButtons } from "./components/mobile-nav/ActionButtons";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavbarProps {
  showMobileNav: boolean;
  toggleMobileNav: () => void;
  isAuth: boolean;
  user: Partial<IUser> | undefined;
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
      className="bg-white p-0 max-w-xs sm:max-w-sm w-full"
    >
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                M
              </span>
            </div>
            <span className="font-semibold">Menu</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMobileNav}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          {user?.role !== "poster" && (
            <CategorySection
              categoryGroups={categoryGroups}
              isLoading={isLoading}
              onNavClick={handleNavClick}
            />
          )}

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
