import React, { useMemo } from "react";
import { paymentColumns } from "./columns";
import { CustomTable } from "@/components/reusables/table/CustomTable";
import { formatCurrency, formatISODate } from "@/utils";
import { useGetTransactionHistory } from "@/services/dashboard/dashboard.hook";
import { usePaginatedTable } from "@/hooks/usePaginatedTable";
import { DATE_FORMAT } from "@/constant";

const BillingTab = () => {
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

  const query = useMemo(() => {
    return {
      ...queryParams,
      type: "debit" as const,
    };
  }, [queryParams]);

  const { data, isPending } = useGetTransactionHistory(query);

  const totalPages = data?.meta.last_page || 1;
  const totalDocuments = data?.meta.total || 0;

  const transactions = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const tableData = useMemo(() => {
    return transactions.map((el) => ({
      reference: el.id,
      amount: formatCurrency({ value: el.amount }),
      date: formatISODate(el.created_at, DATE_FORMAT),
      status: el.status,
    }));
  }, [transactions]);

  return (
    <CustomTable
      title="Payment History"
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

export default BillingTab;
