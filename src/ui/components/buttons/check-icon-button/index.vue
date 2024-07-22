<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faCheck" color="green" @click="emit('click')" />
</template>
