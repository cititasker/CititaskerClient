"use client";
import dynamic from "next/dynamic";
import React from "react";

const Loader = dynamic(() => import("@/components/reusables/Loading"), {
  ssr: false,
});

export default function Loading() {
  return <Loader />;
}
