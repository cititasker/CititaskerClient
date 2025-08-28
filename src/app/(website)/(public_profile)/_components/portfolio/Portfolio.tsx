import Empty from "@/components/myTasks/Empty";
import PulseLoader from "@/components/reusables/loaders/PulseLoader";
import { useGetPorfolio } from "@/services/user/user.hook";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  id: any;
}
export default function Portfolio({ id }: IProps) {
  const [images, setImages] = useState<{ src: string; key: string }[]>([]);
  const { data, isPending, isLoading } = useGetPorfolio({ id });

  const portfolio = data?.data?.portfolio || [];

  useEffect(() => {
    if (portfolio.length) {
      setImages(portfolio.map((src) => ({ src: src.url, key: src.key })));
    }
  }, [portfolio]);

  if (isPending || isLoading) return <PulseLoader />;

  if (images.length == 0) return <Empty text="No portfolio has been added" />;
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {images.map((img, i: number) => (
        <div
          key={i}
          className="h-[300px] rounded-30 overflow-hidden relative group"
        >
          <Image
            src={img.src}
            alt=""
            width={250}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
