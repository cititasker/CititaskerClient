import { useMemo } from "react";
import { useAppSelector } from "@/store/hook";
import {
  useGetBalance,
  useGetTransactionHistory,
} from "@/services/dashboard/dashboard.hook";
import { usePaginatedTable } from "@/hooks/usePaginatedTable";
import { formatCurrency, formatISODate } from "@/utils";
import { DATE_FORMAT } from "@/constant";
import type { ITransactionData } from "@/components/dashboard/transactions/columns";

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

  const {
    queryParams,
    pagination,
    onPaginationChange,
    searchTerm,
    handleSearch,
    hasActiveFilters,
    resetAll,
    handleFilters,
  } = usePaginatedTable({
    defaultPageSize: 10,
    resetPageOnChange: true,
  });

  const { data, isPending: isTransactionPending } =
    useGetTransactionHistory(queryParams);

  const { data: balanceData, isPending: isBalancePending } = useGetBalance();

  const totalPages = data?.meta.last_page || 1;
  const totalDocuments = data?.meta.total || 0;

  const transactions = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const tableData = useMemo<ITransactionData[]>(() => {
    return transactions.map((el) => ({
      reference: el.id,
      type: el.type === "credit" ? "deposit" : "withdraw",
      amount: formatCurrency({ value: el.amount }),
      date: formatISODate(el.created_at, DATE_FORMAT),
      status: el.status,
    }));
  }, [transactions]);

  const balance = balanceData?.balance ?? 0;

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

    tableData,
    totalPages,
    totalDocuments,
    isTransactionPending,
    isBalancePending,

    pagination,
    onPaginationChange,
    searchTerm,
    handleSearch,
    hasActiveFilters,
    resetAll,
    handleFilters,
  };
};
