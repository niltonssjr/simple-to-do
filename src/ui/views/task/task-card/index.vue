<script lang="ts" setup>
import { PropType, computed } from 'vue'
import type { TaskType } from '@/providers'
import { ArrowLeftButton, TrashButton } from '@/ui/components';
const props = defineProps({
    task: {
        type: Object as PropType<TaskType>,
        default: () => ({})
    }
})

const timeStringified = computed(() => {
    let hours = 0
    let minutes = 0
    const MINUTES_PER_HOUR = 60
    hours = Math.floor(props.task.minutes / MINUTES_PER_HOUR)
    minutes = props.task.minutes % MINUTES_PER_HOUR
    const stringifyTimePart = (amount: number, unit: string) => amount > 0 ? `${amount}${unit}` : ''
    return `${stringifyTimePart(hours,'h')} ${stringifyTimePart(minutes, 'm')}`.trim()
})

const emit = defineEmits(['task:remove','task:schedule:add'])

const removeTask = () => { emit('task:remove', props.task.id)}
const addToSchedule = () => { emit('task:schedule:add', props.task.id)}
</script>
<template>
    <div class="task-wrapper">
        <ArrowLeftButton @click="addToSchedule"/>
        <span>
            ( {{ timeStringified }} )
        </span>
        <span class="name">
            {{ task.name }}
        </span>
        <TrashButton @click="removeTask" />
    </div>
</template>
<style lang="scss" scoped>
.task-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    border-left: 3px solid $primary;
    padding: 1rem;
    box-shadow: 0px 0px 13px 5px #f0f3f6;
    .name {
        flex: 1;
        text-align: left;
    }
}
</style>