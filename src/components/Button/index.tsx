import { ButtonProps } from "./types";
import { motion } from "framer-motion"

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="rounded-lg px-8 border-2 border-white py-2 hover:bg-slate-900"
            {...props}>{children}</motion.button>
    )
}

export default Button