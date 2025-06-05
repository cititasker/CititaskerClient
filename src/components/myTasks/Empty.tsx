import Image from "next/image";
import React from "react";
import FormButton from "../forms/FormButton";
import { useRouter } from "next/navigation";

function Empty({ text }: { text: string }) {
  const router = useRouter();
  return (
    <div className="w-full h-full bg-white flex justify-center">
      <div className="flex flex-col items-center max-w-[440px] gap-[14px] h-fit mt-8">
        <Image
          src="/images/empty.png"
          alt="empty icon"
          width={174}
          height={234}
        />
        <p className="text-center text-xl text-lapis font-bold">{text}</p>
        <FormButton
          type="button"
          text="Check task"
          className="max-w-[256px] w-full mt-4"
          onClick={router.back}
        />
      </div>
    </div>
  );
}

export default Empty;
