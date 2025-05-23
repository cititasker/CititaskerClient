import TaskSection from "../myTasks/TaskSection";
import TaskList from "../myTasks/TaskList";

export default function MyTasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh pt-[95px] bg-[#F3F5F6]">
      <div className="container flex gap-3 overflow-y-auto relative">
        <aside className="basis-1/4 sticky top-5 pt-3">
          <TaskSection />
        </aside>
        <main className="flex gap-4 w-3/4 h-[calc(100dvh-95px)]">
          <div className="basis-1/3 h-full overflow-y-auto pt-3 hide-scrollbar">
            <TaskList />
          </div>
          <div className="w-2/3 h-full overflow-y-auto hide-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
