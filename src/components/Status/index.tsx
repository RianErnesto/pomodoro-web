"use client"

import { useTime } from "@/contexts/Time"
import { motion, AnimatePresence } from "framer-motion"

const Status = () => {
    const { status } = useTime()

    return (
        <div className="flex items-center gap-2 absolute top-2 left-4">
            <span>Status:</span>
            <AnimatePresence mode="popLayout">
                {status === "working" && <motion.span key="working" className="text-xl text-green-400 font-semibold" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{duration: .6, ease: "backOut"}}>Working</motion.span>}
                {status === "resting" && <motion.span key="resting" className="text-xl text-blue-500 font-semibold" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{duration: .6, ease: "backOut"}}>Resting</motion.span>}
                {status === "stopped" && <motion.span key="stopped" className="text-xl text-red-500 font-semibold" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{duration: .6, ease: "backOut"}}>Stopped</motion.span>}
            </AnimatePresence>
        </div>
    )
}

export default Status