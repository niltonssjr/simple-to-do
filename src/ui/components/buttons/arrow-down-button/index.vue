<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faArrowDown" color="green" @click="emit('click')" />
</template>
