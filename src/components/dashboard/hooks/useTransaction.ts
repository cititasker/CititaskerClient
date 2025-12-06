import { useMemo } from "react";
import { useGetTransactionHistory } from "@/services/dashboard/dashboard.hook";
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

interface IPaymentType {
  type: "credit" | "debit";
}

export const useTransaction = ({ type }: IPaymentType) => {
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

  const { data, isPending: isTransactionPending } = useGetTransactionHistory({
    ...queryParams,
    type,
  });

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

  return {
    transactions,
    tableData,
    totalPages,
    totalDocuments,
    isTransactionPending,
    //
    pagination,
    onPaginationChange,
    searchTerm,
    handleSearch,
    hasActiveFilters,
    resetAll,
    handleFilters,
  };
};
