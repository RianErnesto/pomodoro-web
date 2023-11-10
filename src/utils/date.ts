export const addSeconds = (date: Date, seconds: number) => {
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}

export const timesToSeconds = (time: { hours: number, minutes: number, seconds: number }) => {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
}