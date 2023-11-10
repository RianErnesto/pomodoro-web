import { InfoProps } from "./types"

const Info = ({title, value}: InfoProps) => {
    return (
        <div className="flex justify-center items-center gap-2">
            <span className="opacity-60">{title}</span>
            <span className="font-bold">{value}</span>
        </div>
    )
}

export default Info