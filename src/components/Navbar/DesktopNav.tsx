import Link from "next/link";
import CategoryDropdown from "../CategoryDropdown";
import { ROUTES } from "@/constant";
import { navbar } from "../../../data";

interface Props {
  isAuth: boolean;
  path: string;
  user: Partial<IUser>;
}

const DesktopNav = ({ isAuth, path, user }: Props) => (
  <ul className="hidden items-center mx-2 lg:flex">
    {navbar.map((nav, i) => {
      // Skip "Browse Tasks" if the user is a poster
      if (nav.name === "Browse Tasks" && user?.role === "poster") return null;

      // 🔽 Dropdown support (if any)
      if (nav?.children) {
        return <CategoryDropdown key={i} nav={nav} extraClass="" />;
      }

      return (
        <li
          key={i}
          className={`text-dark-secondary text-base mr-4 p-2.5 ${
            path === nav.href && "border-b-[3px] border-primary"
          }`}
        >
          <Link href={nav.href}>{nav.name}</Link>
        </li>
      );
    })}

    {isAuth && user?.role && (
      <li
        className={`text-dark-secondary text-base mr-4 p-2.5 ${
          path.includes("/my-tasks") && "border-b-[3px] border-primary"
        }`}
      >
        <Link href={`/${user.role}/${ROUTES.MY_TASKS}`}>My Tasks</Link>
      </li>
    )}
  </ul>
);

export default DesktopNav;
