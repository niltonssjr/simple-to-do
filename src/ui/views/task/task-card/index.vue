<script lang="ts" setup>
import { PropType } from 'vue'
import type { TaskType } from '@/providers'
import { ArrowLeftButton, TrashButton, EditableSpan } from '@/ui/components';
import { StringUtils } from '@/providers/utils/string';
const props = defineProps({
    task: {
        type: Object as PropType<TaskType>,
        default: () => ({})
    }
})

const emit = defineEmits(['task:remove','task:schedule:add', 'task:update'])

const removeTask = () => { emit('task:remove', props.task.id)}
const addToSchedule = () => { emit('task:schedule:add', props.task.id)}

const updateValues = ($event : any, field: string) => {
    emit('task:update', { id: props.task.id, [field] : $event })
}
</script>
<template>
    <div class="task-wrapper">
        <ArrowLeftButton @click="addToSchedule"/>
        <div class="time">
            <EditableSpan 
                :value="task.minutes" 
                @value:change="updateValues($event, 'minutes')" 
                :display-function="StringUtils.stringifyTime" 
                :span-style="{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    padding: '2px 10px',
                    borderRadius: '8px'
                }"/>
        </div>            
        <div class="name">
            <EditableSpan :value="task.name" @value:change="updateValues($event, 'name')" />
        </div>
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