import React from "react";
import { paymentColumns } from "./columns";
import { CustomTable } from "@/components/reusables/table/CustomTable";
import { useTransaction } from "../hooks/useTransaction";

const PaymentTab = () => {
  const {
    searchTerm,
    handleSearch,
    onPaginationChange,
    hasActiveFilters,
    pagination,
    resetAll,
    handleFilters,
    totalDocuments,
    totalPages,
    tableData,
    isTransactionPending,
  } = useTransaction();

  return (
    <CustomTable
      title="Payment History"
      columns={paymentColumns}
      data={tableData}
      isLoading={isTransactionPending}
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

export default PaymentTab;
