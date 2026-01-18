import { API_ROUTES } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions } from "./dashboard.api";
import { WalletTransactionParamsT } from "./dashboard.types";

export const useGetTransactionHistory = (
  params: WalletTransactionParamsT = {}
) => {
  return useQuery({
    queryKey: [API_ROUTES.TRANSACTION_HISTORY, params],
    queryFn: () => getWalletTransactions({ params }),
  });
};
