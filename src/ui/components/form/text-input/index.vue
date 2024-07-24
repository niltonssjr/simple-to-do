<script lang="ts" setup>
import type { WritableComputedRef } from 'vue';
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "text"
    }
})

const emit = defineEmits(['update:modelValue'])

const localValue : WritableComputedRef<string | number> = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

</script>
<template>
    <div class="input-component-wrapper">
        <label v-if="label">{{ label }}</label>
        <input :type="type" v-model="localValue" :placeholder="placeholder"/>
    </div>
</template>

<style lang="scss" scoped>
.input-component-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    input {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        outline: none;
    }
}
</style>