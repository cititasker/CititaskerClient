import { API_ROUTES } from "@/constant";
import { getWalletBalance, getWalletTransactions } from "./dashboard.api";
import { WalletTransactionParamsT } from "./dashboard.types";
import { useBaseQuery } from "@/hooks/useBaseQuery";

export const useGetTransactionHistory = (
  params: WalletTransactionParamsT = {},
) => {
  return useBaseQuery([API_ROUTES.TRANSACTION_HISTORY, params], () =>
    getWalletTransactions({ params }),
  );
};

export const useGetBalance = () => {
  return useBaseQuery([API_ROUTES.WALLET_BALANCE], getWalletBalance);
};
