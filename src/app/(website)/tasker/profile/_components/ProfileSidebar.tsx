import { defaultProfile } from "@/constant/images";
import { useAppSelector } from "@/store/hook";
import { initializeName } from "@/utils";
import Image from "next/image";
import React from "react";
import Badge1 from "@/../public/images/license1.jpg";
import { IDistance, IShieldTick } from "@/constant/icons";
import Rating from "@/components/reusables/Rating";

const skills = ["Mould Accessment and", "Plumbing"];

const ProfileSidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="paper max-w-[300px] h-fit">
      <div className="px-5 pb-5 pt-6 border-b-[0.8px] border-light-grey flex flex-col items-center mb-[30px]">
        <Image
          src={user.profile_image ?? defaultProfile}
          alt="user profile"
          className="w-[100px] h-[100px] rounded-full mb-2 object-cover object-top"
          width={200}
          height={200}
        />
        <p className="capitalise text-xl text-black font-medium flex items-center gap-1">
          {initializeName({
            first_name: user.first_name,
            last_name: user.last_name,
          })}
          <IShieldTick />
        </p>
      </div>
      <div>
        <div className="p-5 pb-8 border-b border-light-grey mb-5">
          <div className="flex items-center gap-1 mb-4">
            <IDistance className="shrink-0" />
            <p className="text-sm text-black">Bodore Ajah, Lagos</p>
          </div>
          <div className="flex items-center gap-1 mb-6">
            <div className="flex items-center gap-1">
              <Rating value={3} onChange={() => {}} />
              <p className="text-sm text-black">3.0</p>
            </div>
            <p className="text-sm text-black">(3259 reviews)</p>
          </div>
          <div>
            <p className="text-base text-black font-semibold mb-3">SKills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((el, i) => (
                <div
                  key={i}
                  className="py-2.5 px-5 bg-light-grey text-black text-xs rounded-40"
                >
                  {el}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-base text-black font-semibold mb-3">Badge</p>
          <div className="flex items-center gap-[14px]">
            <Image src={Badge1} alt="Tasker badge" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
