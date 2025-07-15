"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger as DefaultAccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type AccordionBaseItem = {
  id: string;
  renderTrigger?: () => React.ReactNode;
  renderContent: () => React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  customTrigger?: React.ElementType; // Custom trigger for each item
  className?: string;
};

interface SingleAccordionProps {
  type: "single";
  collapsible?: boolean;
  defaultValue?: string;
  items: AccordionBaseItem[];
  accordionClassName?: string;
  itemWrapperClassName?: string;
}

interface MultipleAccordionProps {
  type: "multiple";
  defaultValue?: string[];
  items: AccordionBaseItem[];
  accordionClassName?: string;
  itemWrapperClassName?: string;
}

type CustomAccordionProps = SingleAccordionProps | MultipleAccordionProps;

const CustomAccordion: React.FC<CustomAccordionProps> = (props) => {
  const {
    type,
    defaultValue,
    items,
    accordionClassName = "",
    itemWrapperClassName = "",
  } = props;

  // Only access collapsible if type is single
  const collapsible = type === "single" ? props.collapsible ?? true : undefined;

  return (
    <Accordion
      type={type}
      defaultValue={defaultValue as any} // safe cast based on discriminated union
      className={accordionClassName}
      {...(type === "single" ? { collapsible } : {})}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={item.className ?? itemWrapperClassName}
        >
          {/* Use CustomTrigger if passed, otherwise fall back to DefaultAccordionTrigger */}
          {item.customTrigger ? (
            <item.customTrigger />
          ) : (
            <DefaultAccordionTrigger className={item.triggerClassName}>
              {item?.renderTrigger?.()}
            </DefaultAccordionTrigger>
          )}

          <AccordionContent className={item.contentClassName}>
            {item.renderContent()}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
