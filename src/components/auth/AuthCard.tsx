import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, className = "" }) => (
  <motion.div
    className={`rounded-xl max-w-md w-full mx-auto bg-background md:shadow-xl md:border border-border-light sm:p-8 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export default AuthCard;
