"use client";
import React from "react";
import { motion, easeOut } from "framer-motion";

// Enhanced stats data with better structure
const STATS = [
  {
    id: 1,
    icon: "/images/stats-icon-1.svg",
    stat: "50,000+",
    label: "Happy Customers",
    description: "Satisfied clients trust our platform",
  },
  {
    id: 2,
    icon: "/images/stats-icon-2.svg",
    stat: "15,000+",
    label: "Verified Taskers",
    description: "Professional service providers",
  },
  {
    id: 3,
    icon: "/images/stats-icon-3.svg",
    stat: "200,000+",
    label: "Tasks Completed",
    description: "Successfully finished projects",
  },
  {
    id: 4,
    icon: "/images/stats-icon-4.svg",
    stat: "4.8/5",
    label: "Average Rating",
    description: "Customer satisfaction score",
  },
] as const;

const STYLES = {
  container: "bg-primary-500 relative overflow-hidden",
  content: "max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12",
  statCard: "text-center group cursor-pointer",
  iconContainer:
    "w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
  statNumber:
    "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300",
  statLabel: "text-lg md:text-xl font-semibold text-primary-100 mb-2",
  statDescription: "text-sm md:text-base text-primary-200 opacity-90",
} as const;

const Stats: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section className={STYLES.container}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034c0-11.05-8.95-20-20-20s-20%208.95-20%2020%208.95%2020%2020%2020%2020-8.95%2020-20zm24%200c0-11.05-8.95-20-20-20s-20%208.95-20%2020%208.95%2020%2020%2020%2020-8.95%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <div className={STYLES.content}>
        <motion.div
          className={STYLES.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={STYLES.statCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Stats Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <p className={STYLES.statNumber}>{stat.stat}</p>
                <h3 className={STYLES.statLabel}>{stat.label}</h3>
                <p className={STYLES.statDescription}>{stat.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        />
      </div>
    </section>
  );
};

export default Stats;
