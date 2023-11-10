"use client"

import { SuggestionProps } from "./types"
import { useTime } from "@/contexts/Time"

const Suggestion = ({ restTime, workTime }: SuggestionProps) => {
    const { resetCounting, setTime, setCounterTime, setRestTime } = useTime()

    const setPomodoro = () => {
        resetCounting()
        if (workTime < 60) {
            setTime({ hours: 0, minutes: workTime, seconds: 0 })
            setRestTime({ hours: 0, minutes: restTime, seconds: 0 })
            setCounterTime({ hours: 0, minutes: workTime, seconds: 0 })
        }
        else {
            const hours = Math.floor(workTime / 60)
            const minutes = workTime % 60
            setTime({ hours, minutes, seconds: 0 })
            setRestTime({ hours: 0, minutes: restTime, seconds: 0 })
            setCounterTime({ hours, minutes, seconds: 0 })
        }
    }

    return (
        <button className="p-2 rounded-md border-2 border-white hover:bg-slate-800" onClick={setPomodoro}>
            <span>{workTime}/{restTime}</span>
        </button>
    )
}

export default Suggestion