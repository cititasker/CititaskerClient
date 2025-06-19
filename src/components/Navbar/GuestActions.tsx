import FormButton from "../forms/FormButton";
import Link from "next/link";
import { ROLE, ROUTES } from "@/constant";

interface IProps {
  user: Partial<IUser>;
}
const GuestActions = ({ user }: IProps) => (
  <div className="items-center gap-4 hidden xl:flex">
    <Link href={ROUTES.SIGNUP}>Sign Up</Link>
    {/* <Link href={ROUTES.LOGIN}>Login</Link> */}
    <FormButton
      text="Login"
      href={ROUTES.LOGIN}
      variant="default"
      size="lg"
      className=""
    />
    {(!user || user.role === ROLE.poster) && (
      <FormButton href={ROUTES.POST_TASK} text="Post a task for free" />
    )}
  </div>
);

export default GuestActions;
