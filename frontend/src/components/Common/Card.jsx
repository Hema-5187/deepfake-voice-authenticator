import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`
        bg-slate-900
        rounded-2xl
        p-6
        shadow-xl
        border
        border-slate-700
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;