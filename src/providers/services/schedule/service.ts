import { DateHandler } from "@/providers/libraries/day-js";
import { ScheduleType } from "@/providers/types";

const scheduleKey = 'schedule'
const startTimeKey = 'schedule-start-time'

export class ScheduleListService {
    static async execute() : Promise<ScheduleType[]> {
        const tasks = localStorage.getItem(scheduleKey)        
        return Promise.resolve(tasks ? JSON.parse(tasks) : [])
    }
}

export class ScheduleStoreService {
    static async execute(tasks : ScheduleType[]) : Promise<boolean> {
        localStorage.setItem(scheduleKey, tasks ? JSON.stringify(tasks) : '' )
        return Promise.resolve(true)
    }
}

export class ScheduleStartTimeRetrieveService {
    static async execute() : Promise<string> {
        let startTime = localStorage.getItem(startTimeKey)
        if (!startTime) {
            startTime = DateHandler.currentDateTime()
            localStorage.setItem(startTimeKey, startTime)
        }
        return Promise.resolve(startTime)
    }
}

export class ScheduleStartTimeStoreService {
    static async execute(time: string) : Promise<boolean> {
        localStorage.setItem(startTimeKey, time)
        return Promise.resolve(true)
    }
}