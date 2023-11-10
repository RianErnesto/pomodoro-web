"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTime } from "@/contexts/Time"

const ShowRepetitions = () => {
    const { repeats, setRepeats, increaseRepeats, decreaseRepeats } = useTime()

    return (
        <motion.div className="flex justify-between items-center gap-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5, ease: "easeIn" }}>
            <button className="hover:bg-slate-700 w-8 h-8 text-2xl flex justify-center items-center border-2 border-white rounded-md" onClick={decreaseRepeats}>-</button>
            <span>{repeats >= 0 ? repeats : 0}</span>
            <button className="hover:bg-slate-700 w-8 h-8 text-2xl flex justify-center items-center border-2 border-white rounded-md" onClick={increaseRepeats}>+</button>
        </motion.div>
    )
}

const Repetitions = () => {
    const { setRepeats, status } = useTime()

    const getInput = (id: string) => {
        const input = document.getElementById(id) as HTMLInputElement
        let value = input.value

        if (Number(value) > 59)
            input.value = "59"

        setRepeats(Number(value))
    }

    return (
        <div className="flex flex-col items-center gap-2 absolute right-8 top-4">
            <label>Repetitions</label>
            <AnimatePresence mode="popLayout">
                {
                    status === "stopped" &&
                    <motion.input
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .5, ease: "easeIn" }}
                        key="repetitions"
                        id="repetitions"
                        name="repetitions"
                        type="number"
                        onChange={() => getInput("repetitions")}
                        min={0}
                        placeholder="00"
                        maxLength={2}
                        className="text-center border-white border-2 rounded  bg-black w-12 h-12" />
                }
                {
                    status !== "stopped" &&
                    <ShowRepetitions />
                }
            </AnimatePresence>

        </div>
    )
}

export default Repetitions