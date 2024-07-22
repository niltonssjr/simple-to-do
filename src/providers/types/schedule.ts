import { TaskType } from "./task"

export interface ScheduleType extends TaskType{
    order: number
}

export interface CalculatedScheduleType extends ScheduleType {
    startTime: string,
    finishTime: string,
    isNow: boolean,
    percentual: number,
    remainingMinutes: number,
    minutes: number
}