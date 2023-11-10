"use client"

import { useEffect, useRef } from "react"
import { useTime } from "@/contexts/Time"

const Alarm = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const {status} = useTime()

    const playAlarm = () => {
        audioRef.current?.play()
    }

    const pauseAlarm = () => {
        audioRef.current?.pause()
    }

    useEffect(() => {
        playAlarm()
    }, [status])

    return (
        <audio className="hidden" ref={audioRef} controls src="/audio/digital-clock-digital-alarm-buzzer.wav" />
    )
}

export default Alarm