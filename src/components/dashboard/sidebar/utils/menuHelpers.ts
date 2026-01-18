import { MenuItem } from "../data/menuConfig";

export const getActiveMenuItem = (
  pathname: string,
  menuItems: MenuItem[],
  role: string
): MenuItem | null => {
  for (const item of menuItems) {
    const fullPath = item.href ? `/${role}${item.href}` : null;
    if (fullPath === pathname) return item;

    if (item.children) {
      const activeChild = getActiveMenuItem(pathname, item.children, role);
      if (activeChild) return activeChild;
    }
  }
  return null;
};

export const getBreadcrumbs = (
  pathname: string,
  menuItems: MenuItem[],
  role: string
): MenuItem[] => {
  const findPath = (
    items: MenuItem[],
    path: MenuItem[] = []
  ): MenuItem[] | null => {
    for (const item of items) {
      const currentPath = [...path, item];
      const fullPath = item.href ? `/${role}${item.href}` : null;

      if (fullPath === pathname) return currentPath;

      if (item.children) {
        const childPath = findPath(item.children, currentPath);
        if (childPath) return childPath;
      }
    }
    return null;
  };

  return findPath(menuItems) || [];
};
