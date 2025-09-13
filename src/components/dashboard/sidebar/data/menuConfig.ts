import {
  LayoutDashboard,
  MessageCircle,
  CreditCard,
  Settings,
  User,
  UserCircle,
} from "lucide-react";

export interface MenuItem {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: MenuItem[];
  badge?: string | number;
  description?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and analytics",
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
    badge: 3, // Example badge for unread messages
    description: "Chat and notifications",
  },
  {
    name: "Payment & Billing",
    href: "/dashboard/payment",
    icon: CreditCard,
    description: "Manage payments and invoices",
  },
  {
    name: "Settings",
    icon: Settings,
    description: "Account and preferences",
    children: [
      {
        name: "Account",
        href: "/dashboard/account",
        icon: User,
        description: "Account settings",
      },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: UserCircle,
        description: "Public profile",
      },
    ],
  },
];
