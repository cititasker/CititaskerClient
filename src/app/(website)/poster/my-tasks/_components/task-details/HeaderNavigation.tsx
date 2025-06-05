import { useRouter } from "next/navigation";
import Icons from "@/components/Icons";

export default function HeaderNavigation() {
  const router = useRouter();
  return (
    <div
      onClick={router.back}
      className="text-primary cursor-pointer my-6 text-[16px] underline font-bold flex gap-2 items-center"
    >
      <Icons.arrowLeft />
      Back to citiTasker
    </div>
  );
}
