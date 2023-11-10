import { TimePreviewProps } from "./types"
import { formatTime } from "@/utils/format"

const TimePreview = ({ hours, minutes, seconds }: TimePreviewProps) => {
    return (
        <div className="flex justify-center py-2 w-full border-2 rounded-md border-blue-300 text-lg">
            <span>{formatTime(hours)}:</span>
            <span>{formatTime(minutes)}:</span>
            <span>{formatTime(seconds)}</span>
        </div>
    )
}

export default TimePreview