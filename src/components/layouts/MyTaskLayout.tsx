import TaskList from "@/components/myTasks/TaskList";
import { TaskFilter } from "../myTasks/TaskFilter";

export default async function MyTasksLayout({
  children,
}: {
  children: React.ReactNode;
  filter?: { href: string; name: string }[];
}) {
  return (
    <div className="h-dvh pt-[90px] bg-[#F3F5F6]">
      <div className="container-w py-0 flex flex-row gap-3 relative overflow-y-auto no-scrollbar">
        <aside className="basis-1/4 w-fit sticky top-5 md:pt-3 hidden xl:inline-block">
          <TaskFilter />
        </aside>
        <main className="flex gap-[14px] w-full xl:w-3/4 h-[calc(100dvh-90px)]">
          <div className="w-full hidden md:inline-block sm:max-w-[300px] lg:basis-1/3 h-full overflow-y-auto pt-3 no-scrollbar">
            <TaskList />
          </div>
          <div className="h-full flex-1 overflow-y-auto md:pt-3 no-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
