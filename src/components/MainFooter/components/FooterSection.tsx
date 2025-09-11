import { FooterSection as FooterSectionT } from "../types";
import { motion } from "framer-motion";
import { FooterLink } from "./FooterLink";
import { itemVariants } from "../constants";

export const FooterSection: React.FC<{
  section: FooterSectionT;
  className?: string;
}> = ({ section, className = "" }) => (
  <motion.div className={`space-y-6 ${className}`} variants={itemVariants}>
    <h3 className="text-xl font-bold text-white">{section.title}</h3>
    <ul className="space-y-4">
      {section.items.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          <FooterLink href={item.href}>{item.name}</FooterLink>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
