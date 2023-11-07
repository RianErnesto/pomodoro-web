"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type TimeType = {
    hours: number,
    minutes: number,
    seconds: number
}

type TimeContextType = {
    time: TimeType
    setTime: (time: TimeType) => void,
    restTime: TimeType,
    setRestTime: (time: TimeType) => void,
    counting: boolean,
    resting: boolean,
    startCounting: () => void,
    stopCounting: () => void,
    resetCounting: () => void
}

const TimeContext = createContext<TimeContextType>({} as TimeContextType);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [restTime, setRestTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [counting, setCounting] = useState(false)
    const [resting, setResting] = useState(false)
    const [repeats, setRepeats] = useState(0)

    const startCounting = () => {
        setCounting(true)
    }

    const stopCounting = () => {
        setCounting(false)
    }

    const resetCounting = () => {
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        setCounting(false)
    }

    useEffect(() => {
        if (counting) {
            const interval = setInterval(() => {
                setTime(prevState => {
                    let { hours, minutes, seconds } = prevState
                    if (seconds > 0) {
                        seconds--
                    } else if (minutes > 0) {
                        minutes--
                        seconds = 59
                    } else if (hours > 0) {
                        hours--
                        minutes = 59
                        seconds = 59
                    } else {
                        stopCounting()
                    }

                    return {
                        hours,
                        minutes,
                        seconds
                    }
                })
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [counting, time.seconds])

    return (
        <TimeContext.Provider value={{ time, setTime, counting, startCounting, stopCounting, resetCounting, restTime, setRestTime, resting }}>
            {children}
        </TimeContext.Provider>
    )
}

export const useTime = () => {
    const context = useContext<TimeContextType>(TimeContext)

    if (context === undefined) {
        throw new Error("useTime must be used within a TimeProvider")
    }

    return context
}