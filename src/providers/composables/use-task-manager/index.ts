import { ref, computed, watch } from 'vue'
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
    }

    const findTaskIndex = (id: number) => Utils.findIndexById(taskList.value, id)

    const updateTask = ({ id, ...otherProps} : Record<string, any>) => {
        const taskIndex = findTaskIndex(id)
        taskList.value[taskIndex] = { 
            ...taskList.value[taskIndex],
            ...otherProps
        }
    }

    const removeTask = (id: number) => {
        const taskIndex = findTaskIndex(id)
        taskList.value.splice(taskIndex, 1)
    }

    const getTaskList = computed(() => taskList.value)

    const addTaskToSchedule = (id: number) => {
        const index = findTaskIndex(id)
        const taskToAdd = taskList.value[index]
        createSchedule(taskToAdd)
    }

    const stringifiedTaskList = computed(() => JSON.stringify(taskList.value))

    watch(stringifiedTaskList, () => {
        TaskStoreService.execute(taskList.value)
    })

    return {
        createTask,
        updateTask,
        removeTask,
        getTaskList,
        addTaskToSchedule
    }

}