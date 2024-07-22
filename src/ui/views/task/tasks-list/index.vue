<script lang="ts" setup>
import TaskCard from '@/ui/views/task/task-card/index.vue'

import { useTaskManager } from '@/providers'
const { getTaskList, removeTask, addTaskToSchedule } = useTaskManager()

const removeTaskFromList = (id: number) => {
    removeTask(id)
}

const addToSchedule = (id: number) => {
    addTaskToSchedule(id)
}

</script>
<template>
    <div class="wrapper">
        <TaskCard v-for="task in getTaskList" :key="task.id" :task="task" @task:remove="removeTaskFromList" @task:schedule:add="addToSchedule"/>
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