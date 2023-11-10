"use client"

import { addSeconds, timesToSeconds } from "@/utils/date";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type TimeType = {
    hours: number,
    minutes: number,
    seconds: number
}

type StatusType = "working" | "resting" | "stopped"

type TimeContextType = {
    time: TimeType
    setTime: (time: TimeType) => void,
    restTime: TimeType,
    setRestTime: (time: TimeType) => void,
    counterTime: TimeType,
    setCounterTime: (time: TimeType) => void,
    repeats: number,
    setRepeats: (repeats: number) => void
    startCounting: () => void,
    resetCounting: () => void,
    status: StatusType,
    setStatus: (status: StatusType) => void,
    datePreview: {
        initialDate: Date,
        finalDate: Date
    },
    increaseRepeats: () => void,
    decreaseRepeats: () => void,
    setDatePreview: (datePreview: {
        initialDate: Date,
        finalDate: Date
    }) => void
}

const TimeContext = createContext<TimeContextType>({} as TimeContextType);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [counterTime, setCounterTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [restTime, setRestTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [status, setStatus] = useState<StatusType>("stopped")
    const [repeats, setRepeats] = useState(0)
    const [datePreview, setDatePreview] = useState({
        initialDate: new Date(),
        finalDate: new Date()
    })

    const increaseRepeats = () => {
        let totalTimeInSeconds = (timesToSeconds(time) + timesToSeconds(restTime)) * (repeats + 2)
        let finalDate = addSeconds(new Date(), totalTimeInSeconds)
        setDatePreview({
            ...datePreview,
            finalDate
        })
        setRepeats(prevState => prevState + 1)
    }

    const decreaseRepeats = () => {
        if (repeats > 0) {
            let totalTimeInSeconds = (timesToSeconds(time) + timesToSeconds(restTime)) * (repeats)
            let finalDate = addSeconds(new Date(), totalTimeInSeconds)
            setDatePreview({
                ...datePreview,
                finalDate
            })
            setRepeats(prevState => prevState - 1)
        }
    }

    const startCounting = () => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
            return
        let totalTimeInSeconds = (timesToSeconds(time) + timesToSeconds(restTime)) * (repeats + 1)
        let finalDate = addSeconds(new Date(), totalTimeInSeconds)
        setDatePreview({
            initialDate: new Date(),
            finalDate
        })
        setCounterTime(time)
        setStatus("working")
        if (repeats < 1)
            setRepeats(0)
    }

    const resetCounting = () => {
        setCounterTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        setRestTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        })
        setStatus("stopped")
    }

    useEffect(() => {
        if (status !== "stopped") {
            const interval = setInterval(() => {
                setCounterTime(prevState => {
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
                        if (repeats >= 0) {
                            if (status === "working") {
                                setStatus("resting")
                                setCounterTime(restTime)
                            }
                            else {
                                setStatus("working")
                                setCounterTime(time)
                            }
                        }
                        else
                            setStatus("stopped")
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
    }, [status, counterTime])

    useEffect(() => {
        if (status === "resting")
            setRepeats(prevState => prevState - 1)
    }, [status])

    return (
        <TimeContext.Provider value={{ increaseRepeats, decreaseRepeats, datePreview, setDatePreview, counterTime, setCounterTime, status, setStatus, repeats, setRepeats, time, setTime, startCounting, resetCounting, restTime, setRestTime }}>
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