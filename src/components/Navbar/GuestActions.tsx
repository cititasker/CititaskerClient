import FormButton from "../forms/FormButton";
import Link from "next/link";
import { ROLE, ROUTES } from "@/constant";

interface IProps {
  user: Partial<IUser>;
}
const GuestActions = ({ user }: IProps) => (
  <div className="items-center gap-4 hidden xl:flex">
    <Link href={ROUTES.SIGNUP}>Sign Up</Link>
    <FormButton
      text="Login"
      href={ROUTES.LOGIN}
      variant="outline"
      className="border-[1.5px] border-primary hover:bg-transparent text-primary"
    />
    {user.role == ROLE.poster && (
      <FormButton href={ROUTES.POST_TASK} text="Post a task for free" />
    )}
  </div>
);

export default GuestActions;
