import { useBaseMutation } from "@/hooks/useBaseMutation";
import { disputesApi } from "./dispute.api";
import { API_ROUTES } from "@/constant";

export function useCreateDispute() {
  return useBaseMutation(disputesApi.createDispute, {
    invalidateQueryKeys: [[API_ROUTES.DISPUTE.CREATE]],
    onSuccess(data) {
      console.log(102, data);
    },
  });
}
