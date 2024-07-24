<script lang="ts" setup>
import { VueDraggableNext as Draggable } from 'vue-draggable-next'
import ScheduleCard from '@/ui/views/schedule/schedule-card/index.vue'

import { CalculatedScheduleType, useScheduleManager } from '@/providers'
import { computed, WritableComputedRef } from 'vue'
const {
    getScheduleList,
    removeSchedule,
    moveTaskDown,
    moveTaskUp,
    updateSchedule,
    reorderList,
} = useScheduleManager()

const removeTaskFromList = (id: number) => {
    removeSchedule(id)
}

const firstIndex = computed(() => (getScheduleList.value.length ? 0 : -1))
const lastIndex = computed(() =>
    getScheduleList.value.length ? getScheduleList.value.length - 1 : -1,
)

const scheduleList: WritableComputedRef<CalculatedScheduleType[]> = computed({
    get: () => getScheduleList.value,
    set: (value: any) => {
        reorderList(value)
    },
})
</script>
<template>
    <Draggable v-model="scheduleList" class="wrapper">
        <ScheduleCard
            v-for="(task, taskIndex) in scheduleList"
            :key="task.id"
            :schedule="task"
            @schedule:remove="removeTaskFromList"
            @schedule:move:up="moveTaskUp"
            @schedule:move:down="moveTaskDown"
            @schedule:update="updateSchedule"
            :show-down-button="taskIndex !== lastIndex"
            :show-up-button="taskIndex !== firstIndex"
        />
    </Draggable>
</template>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 100%;
    overflow-y: auto;
    padding: 1rem;
}
</style>
