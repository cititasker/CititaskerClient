import React from "react";

export default function DashboardLayout({ children }: IChildren) {
  return (
    <div className="bg-light-grey relative h-dvh flex flex-col">
      <div className="container-w py-0 relative flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
