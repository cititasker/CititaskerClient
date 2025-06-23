import Image from "next/image";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import { useAppSelector } from "@/store/hook";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="px-5 pb-8 pt-6 border-b border-light-grey flex flex-col items-center">
      <Image
        src={user.profile_image ?? defaultProfile}
        alt="user profile"
        width={100}
        height={100}
        className="w-[100px] h-[100px] rounded-full mb-2 object-cover"
      />
      <p className="capitalize text-xl text-black font-medium">
        {initializeName({
          first_name: user.first_name,
          last_name: user.last_name,
        })}
      </p>
    </div>
  );
};

export default UserProfile;
