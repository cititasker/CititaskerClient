import { useMemo } from "react";
import { useAppSelector } from "@/store/hook";

export interface WalletTransaction {
  reference: string;
  name: string;
  email: string;
  amount: string;
  method: string;
  date: string;
  status: "successful" | "pending" | "failed";
}

export const useWallet = () => {
  const { user } = useAppSelector((state) => state.user);

  // Mock data - replace with actual API call
  const transactions: WalletTransaction[] = useMemo(
    () => [
      {
        reference: "542218754332295r",
        name: "Michael O.",
        email: "judith.cynthia@gmail.com",
        amount: "NGN 100,000",
        method: "Transfer",
        date: "Jan 22, 2024 11:36 am",
        status: "successful",
      },
      {
        reference: "542218754332296r",
        name: "Sarah K.",
        email: "sarah.kim@gmail.com",
        amount: "NGN 50,000",
        method: "Card",
        date: "Jan 21, 2024 09:15 am",
        status: "pending",
      },
    ],
    []
  );

  const balance = "₦59,040.00";

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  return {
    user,
    transactions,
    balance,
    greeting,
  };
};
