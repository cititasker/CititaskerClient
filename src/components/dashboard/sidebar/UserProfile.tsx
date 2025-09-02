import Image from "next/image";
import { defaultProfile } from "@/constant/images";
import { initializeName } from "@/utils";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}
const UserProfile = ({ className }: IProps) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div
      className={cn(
        "hidden md:flex px-5 pb-8 pt-6 border-b border-light-grey flex-col items-center",
        className
      )}
    >
      <Image
        src={user.profile_image ?? defaultProfile}
        alt="user profile"
        width={200}
        height={200}
        className="w-[100px] h-[100px] rounded-full mb-2 object-cover object-top"
      />
      <Link
        href={`/${user?.role}/profile/${user?.id}`}
        className="capitalize text-xl text-black font-medium inline-block hover:underline cursor-pointer"
      >
        {initializeName({
          first_name: user.first_name,
          last_name: user.last_name,
        })}
      </Link>
    </div>
  );
};

export default UserProfile;
