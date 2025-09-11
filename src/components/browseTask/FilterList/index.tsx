"use client";

import CustomAccordion from "@/components/reusables/CustomAccordion";
import CategoryFilter from "./CategoryFilter";
import { Card } from "@/components/ui/card";
import PriceFilter from "./PriceFilter";
import DistanceFilter from "./DistanceFilter";

interface IProps {
  searchTerm?: string;
}
const FilterList = ({ searchTerm }: IProps) => {
  const items = [
    {
      id: "category",
      renderTrigger: () => <span>Category</span>,
      renderContent: () => <CategoryFilter />,
    },
    {
      id: "location",
      renderTrigger: () => <span>Location</span>,
      renderContent: () => <DistanceFilter />,
    },
    {
      id: "price",
      renderTrigger: () => <span>Price</span>,
      renderContent: () => <PriceFilter />,
    },
  ];

  return (
    <Card className="md:rounded-[20px] shadow-none md:shadow-sm">
      <CustomAccordion
        items={items}
        collapsible
        type="single"
        // defaultValue={["category"]}
        itemWrapperClassName="md:px-5 border-b-[0.8px] border-light-grey"
      />
    </Card>
  );
};

export default FilterList;
