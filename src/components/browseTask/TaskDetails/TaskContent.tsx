import dynamic from "next/dynamic";
import { DescriptionSection } from "./DescriptionSection";
import { ImagesSection } from "./ImagesSection";
import CustomTab from "@/components/reusables/CustomTab";
import PosterInfo from "./PosterInfo";
import { useFetchTaskQuestion } from "@/services/tasks/tasks.hook";

// Lazy load heavy components
const Questions = dynamic(
  () => import("@/components/shared/components/comment/Questions"),
  {
    loading: () => (
      <div className="p-4 text-center text-muted-foreground">
        Loading questions...
      </div>
    ),
    ssr: false,
  }
);

const Offer = dynamic(() => import("../Offer"), {
  loading: () => (
    <div className="p-4 text-center text-muted-foreground">
      Loading offers...
    </div>
  ),
  ssr: false,
});

export const TaskContent = ({
  task,
  onOptionSelect,
}: {
  task: ITask;
  onOptionSelect: (action: MoreOptionItem) => void;
}) => {
  const { data } = useFetchTaskQuestion(task.id);
  const questions = data?.data?.data || [];

  const tabs = [
    {
      label: `Offers (${task.offer_count || 0})`,
      value: "offers",
      render: () => <Offer offers={task.offers} />,
    },
    {
      label: `Questions (${questions.length || 0})`,
      value: "questions",
      render: () => <Questions questions={questions} taskId={task.id} />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <PosterInfo task={task} handleOptionSelect={onOptionSelect} />
      <DescriptionSection description={task.description} />
      <ImagesSection images={task.images} />
      <section>
        <CustomTab items={tabs} />
      </section>
    </div>
  );
};
