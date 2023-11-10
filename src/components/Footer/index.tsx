"use client"

import Button from "../Button";
import { useTime } from "@/contexts/Time";
import { AnimatePresence } from "framer-motion"
import Info from "../Info";
import clsx from "clsx";
import { formatDate } from "@/utils/format";

const Footer = () => {
    const { status, startCounting, resetCounting, datePreview } = useTime()

    return (
        <div className={clsx("px-4 w-full flex gap-4 py-4", status === "stopped" ? "justify-center" : "justify-between")}>
            {status !== "stopped" && <Info title="Started at:" value={formatDate(datePreview.initialDate)}/>}
            <div className="flex gap-4">
                <AnimatePresence>
                    {status === "stopped" && <Button key="start" layout onClick={startCounting}>Start</Button>}
                    <Button key="reset" layout onClick={resetCounting}>Reset</Button>
                </AnimatePresence>
            </div>
            {status !== "stopped" && <Info title="Ends at:" value={formatDate(datePreview.finalDate)}/>}
        </div>
    )
}

export default Footer