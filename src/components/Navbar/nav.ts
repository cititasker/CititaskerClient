export interface NavItem {
  href: string;
  name: string;
  children?: CategoryGroup[];
}

export interface CategoryGroup {
  category: string;
  children: {
    name: string;
    href: string;
  }[];
}
