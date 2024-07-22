import { ref, computed } from 'vue'
import { TaskType } from "../../types";
import { TaskListService, TaskStoreService } from '@/providers/services';
import { useScheduleManager } from '../use-schedule-manager';
import { Utils } from '../utils';

const taskList = ref<TaskType[]>(await TaskListService.execute())
const { createSchedule } = useScheduleManager()

export function useTaskManager() {

    const getNewTaskId = () => Utils.getNewId(taskList.value)

    const createTask = (task: TaskType) => {
        taskList.value.push({
            ...task,
            id: getNewTaskId()
        })
        TaskStoreService.execute(taskList.value)
    }

    const findTaskIndex = (id: number) => Utils.findIndexById(taskList.value, id)

    const updateTask = (id: number, task: TaskType) => {
        const taskIndex = findTaskIndex(id)
        taskList.value[taskIndex] = { ...task}
        TaskStoreService.execute(taskList.value)
    }

    const removeTask = (id: number) => {
        const taskIndex = findTaskIndex(id)
        taskList.value.splice(taskIndex, 1)
        TaskStoreService.execute(taskList.value)
    }

    const getTaskList = computed(() => taskList.value)

    const addTaskToSchedule = (id: number) => {
        const index = findTaskIndex(id)
        const taskToAdd = taskList.value[index]
        createSchedule(taskToAdd)
    }

    return {
        createTask,
        updateTask,
        removeTask,
        getTaskList,
        addTaskToSchedule
    }

}