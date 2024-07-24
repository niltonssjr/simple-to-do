<script lang="ts" setup>
import StartTimeInput from '@/ui/views/schedule/start-time-input/index.vue'
import ScheduleList from '@/ui/views/schedule/schedule-list/index.vue'
import TasksInput from '@/ui/views/task/tasks-input/index.vue'

import { useScheduleManager } from '@/providers';
const { createSchedule } = useScheduleManager()

</script>
<template>
    <div class="container">
        <h2>Agenda do dia</h2>
        <div class="input-container">
            <TasksInput :on-create-task="createSchedule" />
        </div>         
        <div class="input-container">
            <StartTimeInput />
        </div>
       
        <div class="tasks-container">
            <ScheduleList />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 100%;
    .input-container {
        padding: 0 1rem 0.5rem 1rem;
    }
    .tasks-container {
        flex: 1;
        overflow-y: auto;
    }
}
</style>