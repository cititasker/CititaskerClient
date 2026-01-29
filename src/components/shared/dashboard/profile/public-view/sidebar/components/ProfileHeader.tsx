import { IShieldTick } from "@/constant/icons";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export const ProfileHeader = ({ user }: { user: UserProfileData }) => (
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
      </div>

      <div className="flex items-center gap-1">
        <p className="text-lg sm:text-xl font-semibold text-text-primary">
          {initializeName({
            first_name: user?.first_name,
            last_name: user?.last_name,
          }) || "Anonymous User"}
        </p>
        {user?.verification_status && (
          <ShieldCheck
            size={26}
            className="[&_path]:fill-[#13B5EA] [&_path]:stroke-white"
          />
        )}
      </div>
    </div>
  </div>
);
