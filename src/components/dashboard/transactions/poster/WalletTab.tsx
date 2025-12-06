import React, { useMemo } from "react";
import { CustomTable } from "@/components/reusables/table/CustomTable";
import { usePaginatedTable } from "@/hooks/usePaginatedTable";
import { useGetTransactionHistory } from "@/services/dashboard/dashboard.hook";
import { ITransactionData, paymentColumns } from "../columns";

const WalletTab = () => {
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

  const { data, isPending } = useGetTransactionHistory(queryParams);

  const totalPages = data?.meta.last_page || 1;
  const totalDocuments = data?.meta.total || 0;

  const transactions = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const tableData = useMemo<ITransactionData[]>(() => {
    return [];
    // return transactions.map((el) => ({
    //   reference: el.id,
    //   type: el.type === "credit" ? "deposit" : "withdraw",
    //   amount: formatCurrency({ value: el.amount }),
    //   date: formatISODate(el.created_at, DATE_FORMAT),
    //   status: el.status,
    // }));
  }, [transactions]);

  return (
    <CustomTable
      title="Wallet Transaction"
      columns={paymentColumns}
      data={tableData}
      isLoading={isPending}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      totalPages={totalPages}
      totalDocuments={totalDocuments}
      onPaginationChange={onPaginationChange}
      hasActiveFilters={hasActiveFilters}
      pagination={pagination}
      onReset={resetAll}
      onFiltersChange={handleFilters}
    />
  );
};

export default WalletTab;
