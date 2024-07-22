<script lang="ts" setup>
import IconButton from '../icon-button/index.vue'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const emit = defineEmits(['click'])
</script>
<template>
    <IconButton :icon="faXmark" color="red" @click="emit('click')" />
</template>
