<script lang="ts" setup>
const emit = defineEmits(['click'])
</script>
<template>
    <button @click="emit('click')">
        <slot> OK </slot>
    </button>
</template>
<style lang="scss" scoped>
button {
    background-color: $primary;
    color: white;
    height: 35px;
    border-radius: 5px;
    border: none;
    padding: 0 1rem;
    font-weight: 700;
    cursor: pointer;
}
</style>
