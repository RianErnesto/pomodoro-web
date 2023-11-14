"use client"

import { useEffect, useRef, useState } from "react"
import { useTime } from "@/contexts/Time"

const Alarm = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const { status } = useTime()
    const [volume, setVolume] = useState(10)

    const playAlarm = () => {
        audioRef.current?.play()
        if (audioRef) {
            audioRef.current!.volume = volume / 100
        }
    }

    const onInputValueChange = (e: any) => {
        if (audioRef) {
            setVolume(e.target.value)
            audioRef.current!.volume = volume / 100
        }
    }

    const pauseAlarm = () => {
        audioRef.current?.pause()
    }

    useEffect(() => {
        playAlarm()
    }, [status])

    return (
        <div className="w-full py-2 font-bold flex flex-col justify-center items-center">
            <span>Alarm Settings</span>
            <div className="flex items-center justify-center gap-4">
                    <label
                        htmlFor="customRange1"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                        Volume:
                    </label>
                    <input
                        onChange={onInputValueChange}
                        type="range"
                        defaultValue={volume}
                        className="transparent h-1.5 w-20 cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                        id="customRange1"
                    />
                    <span> {volume}</span>
            </div>
            <audio className="hidden" controls ref={audioRef} src="/audio/digital-clock-digital-alarm-buzzer.wav" />
        </div>
    )
}

export default Alarm