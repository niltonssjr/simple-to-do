import { DateHandler } from './../../libraries/day-js/index'
import { ref, computed, WritableComputedRef, ComputedRef, watch } from 'vue'
import { TaskType, ScheduleType, CalculatedScheduleType } from '../../types'
import { Utils } from '../utils'
import {
    ScheduleListService,
    ScheduleStartTimeRetrieveService,
    ScheduleStartTimeStoreService,
    ScheduleStoreService,
} from '@/providers/services'

const scheduleList = ref<ScheduleType[]>(await ScheduleListService.execute())
const _currentStartDateTime = ref<string>(
    await ScheduleStartTimeRetrieveService.execute(),
)

const currentDateTime = ref<string>(DateHandler.currentDateTime())

const SECOND_MILLISSECONDS = 1000
setInterval(() => {
    currentDateTime.value = DateHandler.currentDateTime()
}, SECOND_MILLISSECONDS)

export function useScheduleManager() {
    const getNewScheduleId = () => Utils.getNewId(scheduleList.value)

    const createSchedule = (task: TaskType) => {
        scheduleList.value.push({
            ...task,
            id: getNewScheduleId(),
            order: Utils.getNewOrder(scheduleList.value),
        })
    }

    const findScheduleIndex = (id: number) =>
        Utils.findIndexById(scheduleList.value, id)

    const updateSchedule = ({ id, ...otherProps }: Record<string, any>) => {
        const scheduleIndex = findScheduleIndex(id)
        scheduleList.value[scheduleIndex] = {
            ...scheduleList.value[scheduleIndex],
            ...otherProps,
        }
    }

    const removeSchedule = (id: number) => {
        const scheduleIndex = findScheduleIndex(id)
        scheduleList.value.splice(scheduleIndex, 1)
    }

    const currentStartDateTime: WritableComputedRef<string> = computed({
        get: () => _currentStartDateTime.value,
        set: (value) => (_currentStartDateTime.value = value),
    })

    const getScheduleList: ComputedRef<CalculatedScheduleType[]> = computed(
        () => {
            const orderedSchedule = scheduleList.value.sort(
                (firstElement: ScheduleType, secondElement: ScheduleType) =>
                    firstElement.order - secondElement.order,
            )

            let nextScheduleStartTime = currentStartDateTime.value

            const listToReturn: CalculatedScheduleType[] = []

            for (let schedule of orderedSchedule) {
                const startTime = nextScheduleStartTime
                const finishTime = DateHandler.addMinutes(
                    startTime,
                    schedule.minutes,
                )
                const isNow =
                    startTime <= currentDateTime.value &&
                    finishTime >= currentDateTime.value
                const percentual = isNow
                    ? (DateHandler.differenceInMinutes(
                          startTime,
                          currentDateTime.value,
                      ) /
                          schedule.minutes) *
                      100
                    : 0
                const remainingMinutes = isNow
                    ? DateHandler.differenceInMinutes(
                          currentDateTime.value,
                          finishTime,
                      )
                    : 0
                const calculatedSchedule: CalculatedScheduleType = {
                    ...schedule,
                    startTime: startTime,
                    finishTime: finishTime,
                    isNow,
                    percentual,
                    remainingMinutes,
                }
                listToReturn.push(calculatedSchedule)
                nextScheduleStartTime = finishTime
            }

            return listToReturn
        },
    )

    enum MOVE_DIRECTION {
        UP = -1,
        DOWN = 1,
    }

    const reorderList = (list: any) => {
        scheduleList.value = list.map(
            (
                schedule: CalculatedScheduleType,
                index: number,
            ): ScheduleType => ({
                id: schedule.id,
                minutes: schedule.minutes,
                name: schedule.name,
                order: index + 1,
            }),
        )
    }

    const moveTask = (id: number, direction: MOVE_DIRECTION) => {
        const scheduleIndex = findScheduleIndex(id)

        const lastScheduleIndex = scheduleList.value.length - 1
        if (
            (scheduleIndex === 0 && direction == MOVE_DIRECTION.UP) ||
            (scheduleIndex == lastScheduleIndex &&
                direction == MOVE_DIRECTION.DOWN)
        )
            return

        const baseTask = { ...scheduleList.value[scheduleIndex] }
        const { order: baseTaskOrder } = baseTask

        const targetTask = { ...scheduleList.value[scheduleIndex + direction] }
        const { order: targetTaskOrder } = targetTask

        scheduleList.value[scheduleIndex] = {
            ...baseTask,
            order: targetTaskOrder,
        }

        scheduleList.value[scheduleIndex + direction] = {
            ...targetTask,
            order: baseTaskOrder,
        }
    }

    const moveTaskDown = (id: number) => moveTask(id, MOVE_DIRECTION.DOWN)
    const moveTaskUp = (id: number) => moveTask(id, MOVE_DIRECTION.UP)

    const setStartTime = (time: string) => {
        const startTime = DateHandler.createDateTimeFromTime(time)
        currentStartDateTime.value = startTime
        ScheduleStartTimeStoreService.execute(startTime)
    }

    const setStartTimeToNow = () => {
        const currentTime = DateHandler.currentDateTime()
        currentStartDateTime.value = currentTime
        ScheduleStartTimeStoreService.execute(currentTime)
    }

    const stringifiedScheduleList = computed(() =>
        JSON.stringify(scheduleList.value),
    )

    watch(stringifiedScheduleList, () => {
        ScheduleStoreService.execute(scheduleList.value)
    })

    return {
        createSchedule,
        removeSchedule,
        currentStartDateTime,
        getScheduleList,
        moveTaskUp,
        moveTaskDown,
        setStartTime,
        setStartTimeToNow,
        currentDateTime,
        updateSchedule,
        reorderList,
    }
}
