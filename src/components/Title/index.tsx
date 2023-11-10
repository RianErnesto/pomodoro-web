"use client"

import { useTime } from "../../contexts/Time"

const Title = () => {
    const { status } = useTime()

    const getStatus = () => {
        switch (status) {
            case "working":
                return "Working"
            case "resting":
                return "Resting"
            case "stopped":
                return "Stopped"
        }
    }

    return (
        <title>{getStatus()}</title>
    )
}

export default Title