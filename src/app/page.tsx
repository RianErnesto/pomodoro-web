"use client"

import Counter from "../components/Counter"
import TimePicker from "../components/TimePicker"
import { useTime } from "../contexts/Time"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const { time, counting } = useTime()

  return (
    <main className="flex-1 flex justify-between w-full items-center gap-10 px-8">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold text-center">Work Time</span>
        <AnimatePresence>
          {
            !counting &&
            <motion.div key="time-picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "backOut" }}>
              <TimePicker type="work" />
            </motion.div>
          }
        </AnimatePresence>
      </div>
      <Counter hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold text-center">Rest Time</span>
        <AnimatePresence>
          {
            !counting &&
            <motion.div key="time-picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "backOut" }}>
              <TimePicker type="rest" />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </main>
  )
}