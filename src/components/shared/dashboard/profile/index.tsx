import CustomTab from "@/components/reusables/CustomTab";
import { Card } from "@/components/ui/card";
import React from "react";

interface IProps {
  title: string;
  description: string;
  tabs: any;
}

function Profile({ title, description, tabs }: IProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <Card className="mb-4 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </Card>

        <div className="relative h-full">
          <CustomTab
            items={tabs}
            contentClassName="px-5 sm:px-[30px] lg:px-[50px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
