import Link from "next/link";

export const FooterLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className = "" }) => (
  <Link
    href={href}
    className={`text-text-secondary hover:text-white transition-colors duration-300 ${className}`}
  >
    {children}
  </Link>
);
