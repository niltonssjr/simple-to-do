const stringifyTime = (receivedMinutes: any) => {
    let hours = 0
    let minutes = 0
    const MINUTES_PER_HOUR = 60
    hours = Math.floor(receivedMinutes / MINUTES_PER_HOUR)
    minutes = receivedMinutes % MINUTES_PER_HOUR
    const stringifyTimePart = (amount: number, unit: string) =>
        amount > 0 ? `${amount}${unit}` : ''
    return `${stringifyTimePart(hours, 'h')} ${stringifyTimePart(minutes, 'm')}`.trim()
}

export const StringUtils = {
    stringifyTime,
}
