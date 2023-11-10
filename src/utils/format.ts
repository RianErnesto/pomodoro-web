export const formatTime = (time: number) => {
    if(String(time).length === 1)
        return `0${time}`
    return time
}

export const formatDate = (date: Date) => {
    // Retorna no formato dd/mm/yyyy hh:mm:ss
    return `${formatTime(date.getDate())}/${formatTime(date.getMonth() + 1)}/${date.getFullYear()} ${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`
}