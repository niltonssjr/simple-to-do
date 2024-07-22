<script lang="ts" setup>
import StartTimeInput from '@/ui/views/schedule/start-time-input/index.vue'
import ScheduleList from '@/ui/views/schedule/schedule-list/index.vue'

</script>
<template>
    <div class="container">
        <h2>Agenda do dia</h2>
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
        padding: 1rem;
    }
    .tasks-container {
        flex: 1;
        overflow-y: auto;
    }
}
</style>