"use client"

import ChangeMusic from "@/components/ChangeMusic"
import Counter from "../components/Counter"
import TimePicker from "../components/TimePicker"
import { useTime } from "../contexts/Time"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"
import TimePreview from "@/components/TimePreview"
import Audio from "@/components/Audio"
import Alarm from "@/components/Alarm"

export default function Home() {
  const { counterTime, status, time, restTime, repeats } = useTime()

  return (
    <main className={clsx("flex-1 flex w-full items-center gap-10 px-8")}>
      <Alarm />
      <AnimatePresence>
        {
          status === "stopped" &&
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .6, ease: "backInOut" }} className="flex flex-col gap-4">
            <span className="text-4xl font-bold text-center">Work Time</span>
            <div>
              <TimePicker identifier="worktime" type="work" />
            </div>
            <TimePreview hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
          </motion.div>
        }
      </AnimatePresence>
      <div className="flex flex-col justify-center w-full">
        <Counter hours={counterTime.hours} minutes={counterTime.minutes} seconds={counterTime.seconds} size={status === "stopped" ? "medium" : "large"} />
        {
          status !== "stopped" &&
          <div className="flex items-center justify-center gap-4 opacity-50">
            <span>Next time:</span>
            {
              status === "working" ?
                <Counter size="small" hours={restTime.hours} minutes={restTime.minutes} seconds={restTime.seconds} /> :
                <Counter size="small" hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
            }
          </div>
        }
        <Audio />
        {
          status !== "stopped" &&
          <ChangeMusic />
        }
      </div>
      <AnimatePresence>
        {
          status === "stopped" &&
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .6, ease: "backInOut" }} className="flex flex-col gap-4">
            <span className="text-4xl font-bold text-center">Rest Time</span>
            <div>
              <TimePicker identifier="rest-time" type="rest" />
            </div>
            <TimePreview hours={restTime.hours} minutes={restTime.minutes} seconds={restTime.seconds} />
          </motion.div>
        }
      </AnimatePresence>
    </main>
  )
}