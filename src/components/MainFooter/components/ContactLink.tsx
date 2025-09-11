export const ContactLink: React.FC<{
  type: "email" | "phone" | "address";
  children: React.ReactNode;
}> = ({ type, children }) => {
  const getHref = () => {
    switch (type) {
      case "email":
        return `mailto:${children}`;
      case "phone":
        return `tel:${children?.toString().replace(/ /g, "")}`;
      default:
        return "#";
    }
  };

  return type === "address" ? (
    <span className="text-text-secondary">{children}</span>
  ) : (
    <a
      href={getHref()}
      className="text-text-secondary hover:text-white transition-colors duration-300"
    >
      {children}
    </a>
  );
};
