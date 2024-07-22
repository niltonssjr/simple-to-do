<script lang="ts" setup>
import ScheduleCard from '@/ui/views/schedule/schedule-card/index.vue'

import { useScheduleManager } from '@/providers'
import { computed } from 'vue';
const { getScheduleList, removeSchedule, moveTaskDown, moveTaskUp, updateSchedule } = useScheduleManager()

const removeTaskFromList = (id: number) => {
    removeSchedule(id)
}

const firstIndex = computed(() => getScheduleList.value.length ? 0 : -1)
const lastIndex = computed(() => getScheduleList.value.length ? getScheduleList.value.length - 1 : -1)

</script>
<template>
    <div class="wrapper">
        <ScheduleCard 
        v-for="(task, taskIndex) in getScheduleList" 
        :key="task.id" 
        :schedule="task" 
        @schedule:remove="removeTaskFromList" 
        @schedule:move:up="moveTaskUp" 
        @schedule:move:down="moveTaskDown"
        @schedule:update="updateSchedule"
        :show-down-button="taskIndex !== lastIndex"
        :show-up-button="taskIndex !== firstIndex"
        />
    </div>
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