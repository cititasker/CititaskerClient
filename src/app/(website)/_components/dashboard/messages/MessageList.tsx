"use client";
import CustomTab from "@/components/reusables/CustomTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISearch } from "@/constant/icons";
import React, { useState } from "react";

export default function MessageList() {
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    {
      label: "All",
      value: "all",
      render: () => <p className="p-5">Hello World</p>,
    },
    {
      label: "Unread",
      value: "unread",
      render: () => <p className="p-5">Unread</p>,
    },
    {
      label: "Archive",
      value: "archive",
      render: () => <p className="p-5">Archive</p>,
    },
  ];

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Card>
      <CardHeader className="border-b border-light-grey mb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Chats</CardTitle>
          <p>Menu</p>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="px-5 mb-3">
          <div className="relative flex-1">
            <ISearch className="absolute top-0 bottom-0 my-auto ml-3 shrink-0" />
            <Input
              className="pl-10 bg-white w-full h-11"
              placeholder="search for a task..."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <CustomTab
            items={tabs}
            triggerClassName="font-normal text-black-2 flex-1"
            listClassName="justify-between"
          />
        </div>
        {/* <ScrollArea className="h-[500px]"></ScrollArea> */}
      </CardContent>
    </Card>
  );
}
