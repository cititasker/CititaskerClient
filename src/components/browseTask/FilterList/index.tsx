"use client";

import CustomAccordion from "@/components/reusables/CustomAccordion";
import CategoryFilter from "./CategoryFilter";
import { Card } from "@/components/ui/card";

const FilterList = () => {
  const items = [
    {
      id: "category",
      renderTrigger: () => <span>Category</span>,
      renderContent: () => <CategoryFilter />,
    },
    {
      id: "location",
      renderTrigger: () => <span>Location</span>,
      renderContent: () => (
        <p className="text-sm text-muted-foreground">
          Location filter content here.
        </p>
      ),
    },
    {
      id: "price",
      renderTrigger: () => <span>Price</span>,
      renderContent: () => (
        <p className="text-sm text-muted-foreground">
          Price filter content here.
        </p>
      ),
    },
  ];

  return (
    <Card className="rounded-[20px]">
      <CustomAccordion
        items={items}
        type="multiple"
        defaultValue={["category"]}
        itemWrapperClassName="px-5 border-b-[0.8px] border-light-grey"
      />
    </Card>
  );
};

export default FilterList;
