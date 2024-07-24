import dayjs from 'dayjs'

const fullFormat = 'YYYY-MM-DD HH:mm:ss'
const timeFormat = 'HH:mm'
const MINUTE_FORMAT = 'm'

const currentDateTime = () => dayjs().format(fullFormat)

const createDateTimeFromTime = (time: string) => {
    const [hour, minute] = time.split(':')
    const currentDate = dayjs()
        .hour(parseInt(hour, 10))
        .minute(parseInt(minute, 10))
    return currentDate.format(fullFormat)
}

const addMinutes = (baseTime: string, minutes: number) => {
    return dayjs(baseTime).add(minutes, 'm').format(fullFormat)
}

const formatToTime = (baseTime: string) => dayjs(baseTime).format(timeFormat)

const differenceInMinutes = (firstDateTime: string, secondDateTime: string) =>
    dayjs(secondDateTime).diff(dayjs(firstDateTime), MINUTE_FORMAT)

export const DateHandler = {
    core: dayjs,
    currentDateTime,
    addMinutes,
    formatToTime,
    createDateTimeFromTime,
    differenceInMinutes,
}
