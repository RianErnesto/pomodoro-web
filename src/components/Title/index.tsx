"use client"

import { useTime } from "../../contexts/Time"

const Title = () => {
    const { counting } = useTime()

    return (
        <title>{counting ? "Working" : "Resting"}</title>
    )
}

export default Title