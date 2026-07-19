import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        justify-center
        gap-3
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        transition-all
        duration-300
        text-white
        font-semibold
        py-4
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;