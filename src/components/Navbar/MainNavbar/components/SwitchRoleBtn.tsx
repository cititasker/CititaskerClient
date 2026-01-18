"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API_ROUTES, ROLE } from "@/constant";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";
import { useSwitchRole } from "@/services/user/user.hook";
import { loginWithCredentials } from "@/actions/authActions";
import { useRouter } from "next/navigation";

interface IProps {
  user: Partial<IUser>;
  className?: string;
}

export default function SwitchRoleBtn({ user, className }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const switchRoleMutation = useSwitchRole({
    onSuccess: async (response) => {
      try {
        await loginWithCredentials(response.data);
        queryClient.invalidateQueries({
          queryKey: [API_ROUTES.GET_USER_DETAILS],
        });

        toast.success(`Successfully switched to ${response.data.role}`);
        router.refresh();
      } catch (error) {
        console.error("Error updating session:", error);
        toast.error("Failed to update session");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Switch role error:", error);
      toast.error("Failed to switch role");
      setIsLoading(false);
    },
  });

  const handleSwitch = async () => {
    setIsLoading(true);
    const newRole = user.role === ROLE.tasker ? ROLE.poster : ROLE.tasker;

    switchRoleMutation.mutate({ role: newRole });
  };

  return (
    <FormButton
      onClick={handleSwitch}
      size="lg"
      className={cn("w-full mb-3 rounded-full", className)}
      disabled={isLoading || switchRoleMutation.isPending}
    >
      {isLoading || switchRoleMutation.isPending
        ? "Switching..."
        : `Switch to ${user.role === ROLE.tasker ? "Poster" : "Tasker"}`}
    </FormButton>
  );
}
