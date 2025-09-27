export const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

export const formatDate = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (messageDate.getTime() === today.getTime()) return "Today";
  if (messageDate.getTime() === today.getTime() - 86400000) return "Yesterday";
  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
