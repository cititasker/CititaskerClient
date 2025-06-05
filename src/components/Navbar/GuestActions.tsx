import FormButton from "../forms/FormButton";
import Link from "next/link";
import { ROUTES } from "@/constant";

const GuestActions = () => (
  <div className="items-center gap-4 hidden xl:flex">
    <Link href={ROUTES.SIGNUP}>Sign Up</Link>
    <FormButton
      text="Login"
      href={ROUTES.LOGIN}
      className="border-[1.5px] border-primary bg-transparent text-primary"
    />
    <FormButton href={ROUTES.POST_TASK} text="Post a task for free" />
  </div>
);

export default GuestActions;
