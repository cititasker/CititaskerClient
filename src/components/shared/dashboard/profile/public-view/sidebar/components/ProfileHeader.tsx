import { IShieldTick } from "@/constant/icons";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import Image from "next/image";

export const ProfileHeader = ({ user }: { user: any }) => (
  <div className="p-6 border-b border-neutral-200 bg-gradient-to-br from-primary-50 to-background">
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <Image
          src={user?.profile_image || defaultProfile}
          alt={`${user?.first_name || "User"}'s profile`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top ring-2 ring-background shadow-lg"
          width={200}
          height={200}
        />
        {user?.is_verified && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center shadow-lg">
            <IShieldTick className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
          {initializeName({
            first_name: user?.first_name,
            last_name: user?.last_name,
          }) || "Anonymous User"}
        </h2>

        {user?.job_title && (
          <p className="text-sm text-text-muted font-medium bg-neutral-100 px-3 py-1 rounded-full">
            {user.job_title}
          </p>
        )}
      </div>
    </div>
  </div>
);
