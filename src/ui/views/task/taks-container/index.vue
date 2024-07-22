<script lang="ts" setup>
import TasksInput from '@/ui/views/task/tasks-input/index.vue'
import TasksList from '@/ui/views/task/tasks-list/index.vue'

</script>
<template>
    <div class="container">
        <h2>Tarefas</h2>
        <div class="input-container">
            <TasksInput />
        </div>
        <div class="tasks-container">
            <TasksList />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input-container {
        padding: 1rem;
    }
    .tasks-container {
        flex: 1
    }
}
</style>