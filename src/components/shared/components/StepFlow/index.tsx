import UnderlinedHeader from "@/components/reusables/UnderlinedHeader";
import StepFlowItem from "./StepFlowItem";
import { cn } from "@/lib/utils";

interface StepFlowProps {
  title?: string;
  highlightedText?: string;
  items: StepFlowItem[];
  className?: string;
  sectionId?: string;
}

const StepFlow: React.FC<StepFlowProps> = ({
  title = "Get your to-dos done on",
  highlightedText = "CitiTasker",
  items,
  className,
  sectionId = "how_it_works",
}) => {
  return (
    <section
      className={cn("bg-background py-16 lg:py-24", className)}
      id={sectionId}
    >
      <div className="container-w">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {title}{" "}
            <span className="sm:hidden text-primary">{highlightedText}</span>
            <span className="hidden sm:inline">
              <UnderlinedHeader text={highlightedText} />
            </span>{" "}
            <span className="block sm:inline">in easy steps</span>
          </h2>
        </div>

        {/* Steps Grid - Matching Original Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[4.375rem] xl:gap-x-[5.5rem] max-w-[1192px] mx-auto">
          {items.map((item, index) => (
            <StepFlowItem
              key={index}
              data={{ ...item, id: index }}
              index={index}
              totalItems={items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepFlow;
