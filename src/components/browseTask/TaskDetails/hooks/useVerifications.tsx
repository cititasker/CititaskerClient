import { useMemo } from "react";

export const useVerifications = (user: any) => {
  return useMemo(() => {
    const kyc = user?.kyc_stage || {};
    const face = kyc.face_verification || false;
    const id = kyc.id_verification || false;
    const home = kyc.home_address || false;

    return {
      id: face && id && home,
      bank: kyc.bank || false,
      profile: kyc.profile || false,
    };
  }, [user?.kyc_stage]);
};
