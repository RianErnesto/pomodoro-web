'use client'

import { useTime } from "@/contexts/Time"
import { ReactNode } from "react"
import { TimePickerProps } from "./types"

const TimeBox = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col items-center gap-2">
        {children}
    </div>
)

const TimePicker = ({ type }: TimePickerProps) => {
    const { time, setTime, restTime, setRestTime } = useTime()

    const getInput = (id: string) => {
        const input = document.getElementById(id) as HTMLInputElement
        let value = input.value

        if (Number(value) > 59)
            input.value = "59"

        switch (type) {
            case "work":
                setTime({
                    ...time,
                    [id]: Number(value)
                })
                break;
            case "rest":
                setRestTime({
                    ...restTime,
                    [id]: Number(value)
                })
                break;
        }
    }

    return (
        <div className="flex justify-center gap-8">
            <TimeBox >
                <label htmlFor="hours">Hours</label>
                <input
                    id="hours"
                    name="hours"
                    type="number"
                    onChange={() => getInput("hours")}
                    min={0}
                    placeholder="00"
                    maxLength={2}
                    className="text-center border-white border-2 rounded  bg-black w-12 h-12" />
            </TimeBox>
            <TimeBox>
                <label htmlFor="minutes">Minutes</label>
                <input
                    onKeyUp={() => getInput("minutes")}
                    onClick={() => getInput("minutes")}
                    onChange={() => getInput("minutes")}
                    id="minutes"
                    name="minutes"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    maxLength={2}
                    className="text-center border-white border-2 rounded  bg-black w-12 h-12" />
            </TimeBox>
            <TimeBox>
                <label htmlFor="seconds">Seconds</label>
                <input
                    onKeyUp={() => getInput("seconds")}
                    onClick={() => getInput("seconds")}
                    onChange={() => getInput("seconds")}
                    id="seconds"
                    name="seconds"
                    type="number"
                    min={0}
                    max={59}
                    placeholder="00"
                    maxLength={2}
                    className="text-center border-white border-2 rounded  bg-black w-12 h-12" />
            </TimeBox>
        </div >
    )
}

export default TimePicker