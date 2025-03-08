import PaystackPop from "@paystack/inline-js";

interface IData {
  amount: number;
  email: string;
  metadata?: any;
  reference?: string;
  handleSuccess: (data: any) => void;
  currency?: string;
}
const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

function generateReference(reference: any) {
  if (reference) return reference;
  else {
    const date = new Date();
    return date.getTime().toString();
  }
}

const Paystack = {
  startPayment: ({
    amount,
    email,
    metadata = {},
    reference,
    handleSuccess,
    currency = "NGN",
  }: IData) => {
    const paystackInstance = new PaystackPop();
    paystackInstance.newTransaction({
      amount,
      email,
      key,
      metadata,
      currency,
      reference: generateReference(reference),
      onSuccess: handleSuccess,
    });
  },
};

export default Paystack;
