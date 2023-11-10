import { CounterProps } from "./types"
import { formatTime } from "@/utils/format"
import clsx from "clsx"

const Counter = ({ hours = 0, minutes = 0, seconds = 0, size = "medium" }: CounterProps) => {
    return (
        <div className={clsx("flex justify-center", size === "small" && "text-xl", size === "medium" && "text-8xl", size === "large" && "text-[140px]")}>
            <span >{formatTime(hours)}</span>:
            <span>{formatTime(minutes)}</span>:
            <span>{formatTime(seconds)}</span>
        </div>
    )
}

export default Counter