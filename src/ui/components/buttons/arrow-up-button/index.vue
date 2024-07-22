<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faArrowUp" color="green" @click="emit('click')" />
</template>