import Image from "next/image";
import React from "react";

function Empty({ text }: { text: string }) {
  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div className="flex flex-col items-center max-w-[440px] gap-[14px] h-fit">
        <Image
          src="/images/empty.png"
          alt="empty icon"
          width={174}
          height={234}
        />
        <p className="text-center text-2xl text-lapis">{text}</p>
      </div>
    </div>
  );
}

export default Empty;
