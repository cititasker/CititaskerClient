"use client";

import React from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_LOGO } from "@/constant/images";

interface BrandLogoProps extends Partial<ImageProps> {
  href?: string; // Optional link
  src?: ImageProps["src"]; // Optional custom logo
  alt?: string;
  width?: number;
  height?: number;
  className?: string; // Wrapper class
  imgClassName?: string; // Image class
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  href,
  src = BRAND_LOGO,
  alt = "Brand Logo",
  width = 140,
  height = 32,
  className,
  imgClassName,
  ...rest
}) => {
  const logoImage = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain", imgClassName)}
      {...rest}
    />
  );

  return href ? (
    <Link href={href} className={cn("inline-block", className)}>
      {logoImage}
    </Link>
  ) : (
    <div className={cn("inline-block", className)}>{logoImage}</div>
  );
};

export default BrandLogo;
