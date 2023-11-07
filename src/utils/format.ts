export const formatTime = (time: number) => {
    if(String(time).length === 1)
        return `0${time}`
    return time
}