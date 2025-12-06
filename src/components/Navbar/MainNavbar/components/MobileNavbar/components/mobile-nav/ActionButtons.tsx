import React from "react";
import { User, Search, Plus } from "lucide-react";
import { ROLE, ROUTES } from "@/constant";
import FormButton from "@/components/forms/FormButton";

interface ActionButtonsProps {
  user: Partial<IUser> | undefined;
  isAuth: boolean;
  onNavClick: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  user,
  isAuth,
  onNavClick,
}) => (
  <div className="p-4 space-y-3 bg-neutral-50/50 border-t border-neutral-200">
    {!isAuth && (
      <div className="grid grid-cols-2 gap-3">
        <FormButton
          href={ROUTES.CREATE_ACCOUNT}
          onClick={onNavClick}
          variant="outline"
          className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 h-11 text-sm font-medium"
        >
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </FormButton>

        <FormButton
          href={ROUTES.LOGIN}
          onClick={onNavClick}
          variant="outline"
          className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 h-11 text-sm font-medium"
        >
          <User className="w-4 h-4 mr-2" />
          Login
        </FormButton>
      </div>
    )}

    <div className="space-y-3">
      {(!isAuth || user?.role === ROLE.tasker) && (
        <FormButton
          href={ROUTES.BROWSE_TASK}
          onClick={onNavClick}
          variant="outline"
          className="w-full border-primary-200 text-primary-700 hover:bg-primary-50 h-12 text-sm font-medium"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse Tasks
        </FormButton>
      )}

      {(!isAuth || user?.role === ROLE.poster) && (
        <FormButton
          href={ROUTES.POST_TASK}
          onClick={onNavClick}
          className="w-full h-12 text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Post Task
        </FormButton>
      )}
    </div>
  </div>
);
