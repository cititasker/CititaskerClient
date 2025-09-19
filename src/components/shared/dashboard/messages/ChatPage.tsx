import { redirect } from "next/navigation";

const MessagesPage = () => {
  // Redirect to a default conversation or show empty state
  // For now, redirect to the first conversation
  redirect("/messages/1");
};

export default MessagesPage;
