<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faArrowLeft" color="green" @click="emit('click')" />
</template>