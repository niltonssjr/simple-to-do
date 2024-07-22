<script lang="ts" setup>
import { ref } from 'vue'
import { TaskType } from '@/providers';
import { TextInput, PrimaryButton } from '@/ui/components';

import { useTaskManager } from '@/providers';
const { createTask } = useTaskManager()

const getCleanTask = () =>  ({
    id: 0,
    name: '',
    minutes: 0    
})

const task = ref<TaskType>(getCleanTask())

const insertTask = () => {
    createTask(task.value)
    task.value = getCleanTask()
}
</script>
<template>
    <div class="wrapper">
        <div class="name">
            <TextInput v-model="task.name" label="Tarefa"/>
        </div>
        <div class="minutes">
            <TextInput v-model="task.minutes" label="minutos" @keypress.enter="insertTask"/>
        </div>
        <PrimaryButton @click="insertTask">+</PrimaryButton>
    </div>
</template>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    .name {
        flex: 1
    }
    .minutes {
        width: 100px
    }

}
</style>