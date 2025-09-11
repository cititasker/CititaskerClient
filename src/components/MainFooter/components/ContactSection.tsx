import { CONTACT_INFO, itemVariants } from "../constants";
import { ContactLink } from "./ContactLink";
import { motion } from "framer-motion";

export const ContactSection: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <motion.div className={`space-y-6 ${className}`} variants={itemVariants}>
    <h3 className="text-xl font-bold text-white">Get in touch</h3>
    <ul className="space-y-4">
      <motion.li variants={itemVariants}>
        <ContactLink type="address">{CONTACT_INFO.address}</ContactLink>
      </motion.li>
      <motion.li variants={itemVariants}>
        <ContactLink type="phone">{CONTACT_INFO.phone}</ContactLink>
      </motion.li>
      <motion.li variants={itemVariants}>
        <ContactLink type="email">{CONTACT_INFO.email}</ContactLink>
      </motion.li>
    </ul>
  </motion.div>
);
