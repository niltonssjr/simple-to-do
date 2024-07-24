<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faTrash" color="red" @click="emit('click')" />
</template>
