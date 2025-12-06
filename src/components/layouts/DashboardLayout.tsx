import React from "react";

const DashboardLayout = async ({ children }: IChildren) => {
  return (
    <div className="bg-light-grey relative h-dvh flex flex-col">
      <div className="container-w py-0 relative flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
