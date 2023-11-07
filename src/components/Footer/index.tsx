"use client"

import Button from "../Button";
import { useTime } from "@/contexts/Time";
import { AnimatePresence } from "framer-motion"

const Footer = () => {
    const { counting, startCounting, stopCounting, resetCounting } = useTime()

    return (
        <div className="w-full flex justify-center gap-4 py-4">
            <AnimatePresence>
                {counting ? <Button key="pause" layout onClick={stopCounting}>Pause</Button> : <Button key="start" layout onClick={startCounting}>Start</Button>}
                <Button key="reset" layout onClick={resetCounting}>Reset</Button>
            </AnimatePresence>
        </div>
    )
}

export default Footer