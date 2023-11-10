"use client"

import { useEffect } from "react"
import { useTime } from "@/contexts/Time"
import { useMusic } from "@/contexts/Music"
import { motion, AnimatePresence } from "framer-motion"

const Audio = () => {
    const { status } = useTime()
    const { playMusic, setMusicVolume, stopMusic, music } = useMusic()

    useEffect(() => {
        setMusicVolume(100)
        if (status === "stopped")
            stopMusic()
        else if (status === "working")
            playMusic()
    }, [status])

    return (
        <motion.div initial={{opacity: .2}} animate={{opacity: .8}} transition={{repeat: Infinity, repeatType: "reverse", duration: 2}} className="p-10 flex flex-col justify-center items-center gap-2 w-full">
            {
                status !== "stopped" &&
                <AnimatePresence>
                    <motion.div key="music" initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}}>
                        <span>Listening </span>
                        <span className="font-bold">{music.name}</span>
                    </motion.div>
                    <motion.div key="url" initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}}>
                        <span>Watch in YouTube </span>
                        <span className="font-bold underline">
                            <a href={music.youtubeUrl} target="_blank">
                                {music.youtubeUrl}
                            </a>
                        </span>
                    </motion.div>
                </AnimatePresence>
            }
            <iframe id="player" className="hidden" allow="autoplay; encrypted-media"
                src={music.embedUrl}>
            </iframe>
        </motion.div >
    )
}

export default Audio