import { TaskType } from "@/providers/types";
const localStorageKey = 'tasks'

export class TaskListService {
    static async execute() : Promise<TaskType[]> {
        const tasks = localStorage.getItem(localStorageKey)        
        return Promise.resolve(tasks ? JSON.parse(tasks) : [])
    }
}

export class TaskStoreService {
    static async execute(tasks : TaskType[]) : Promise<boolean> {
        localStorage.setItem(localStorageKey, tasks ? JSON.stringify(tasks) : '' )
        return Promise.resolve(true)
    }
}