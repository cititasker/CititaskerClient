"use client";
import React, { Suspense } from "react";

export default function AppProvider({ children }: any) {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
}
