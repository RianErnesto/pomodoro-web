"use client"

import Suggestion from "../Suggestion"
import { useTime } from "@/contexts/Time"
import { motion, AnimatePresence } from "framer-motion"
import MusicStyleSelect from "../MusicStyleSelect"
import ChangeMusic from "../ChangeMusic"

const Header = () => {
    const { status } = useTime()

    return (
        <AnimatePresence>
            {
                status === "stopped" &&
                <header className="flex gap-10 w-full p-4 justify-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .5, ease: "easeIn" }} className="flex gap-8">
                        <Suggestion restTime={5} workTime={25} />
                        <Suggestion restTime={10} workTime={50} />
                        <Suggestion restTime={15} workTime={75} />
                    </motion.div>
                    <MusicStyleSelect />
                </header>
            }
        </AnimatePresence>
    )
}

export default Header