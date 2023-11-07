import { CounterProps } from "./types"
import { formatTime } from "@/utils/format"

const Counter = ({ hours = 0, minutes = 0, seconds = 0 }: CounterProps) => {
    return (
        <div className="flex justify-center text-8xl">
            <span >{formatTime(hours)}</span>:
            <span>{formatTime(minutes)}</span>:
            <span>{formatTime(seconds)}</span>
        </div>
    )
}

export default Counter