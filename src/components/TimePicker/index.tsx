'use client'

import { useTime } from "@/contexts/Time"
import { ReactNode } from "react"
import { TimePickerProps } from "./types"

const TimeBox = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col items-center gap-2">
        {children}
    </div>
)

const TimePicker = ({ identifier, type }: TimePickerProps) => {
    const { time, setTime, setCounterTime, restTime, setRestTime } = useTime()

    const getInput = (id: string) => {
        const input = document.getElementById(id) as HTMLInputElement
        let value = input.value

        if (Number(value) > 59)
            input.value = "59"

        switch (type) {
            case "work":
                setTime({
                    ...time,
                    [id.replace(`${identifier}-`, "")]: Number(value)
                })
                setCounterTime({
                    ...time,
                    [id.replace(`${identifier}-`, "")]: Number(value)
                })
                break;
            case "rest":
                setRestTime({
                    ...restTime,
                    [id.replace(`${identifier}-`, "")]: Number(value)
                })
                break;
        }
    }

    return (
        <div className="flex justify-center gap-8">
            <TimeBox >
                <label htmlFor="hours">Hours</label>
                <input
                    id={`${identifier}-hours`}
                    name="hours"
                    type="number"
                    onChange={() => getInput(`${identifier}-hours`)}
                    min={0}
                    placeholder="00"
                    maxLength={2}
                    className="text-center border-white border-2 rounded  bg-black w-12 h-12" />
            </TimeBox>
            <TimeBox>
                <label htmlFor="minutes">Minutes</label>
                <input
                    onKeyUp={() => getInput(`${identifier}-minutes`)}
                    onClick={() => getInput(`${identifier}-minutes`)}
                    onChange={() => getInput(`${identifier}-minutes`)}
                    id={`${identifier}-minutes`}
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
                    onKeyUp={() => getInput(`${identifier}-seconds`)}
                    onClick={() => getInput(`${identifier}-seconds`)}
                    onChange={() => getInput(`${identifier}-seconds`)}
                    id={`${identifier}-seconds`}
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