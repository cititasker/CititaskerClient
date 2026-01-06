import { useBaseMutation } from "@/hooks/useBaseMutation";
import { disputesApi } from "./dispute.api";
import { API_ROUTES } from "@/constant";
import { useBaseQuery } from "@/hooks/useBaseQuery";

export function useCreateDispute() {
  return useBaseMutation(disputesApi.createDispute, {
    invalidateQueryKeys: [[API_ROUTES.DISPUTE.GET_ALL]],
    onSuccess(data) {
      console.log(102, data);
    },
  });
}

export function useFetchDispute(id: string) {
  return useBaseQuery([API_ROUTES.DISPUTE.GET_ALL, id], () =>
    disputesApi.getDispute(id)
  );
}

export function useRejectDisputeProposal() {
  return useBaseMutation(disputesApi.rejectProposal, {
    invalidateQueryKeys: [[API_ROUTES.DISPUTE.GET_ALL]],
  });
}

export function useUpdateProposal() {
  return useBaseMutation(disputesApi.updateProposal, {
    invalidateQueryKeys: [[API_ROUTES.DISPUTE.GET_ALL]],
  });
}
