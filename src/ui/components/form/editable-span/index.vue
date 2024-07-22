<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TextInput } from '..';
import { CancelIconButton, CheckIconButton } from '../../buttons';

const emit = defineEmits(['value:change'])

const props = defineProps({
    value: {
        type: [Number, String],
        default: ''
    },
    displayFunction: {
        type: Function,
        default: (value : any) => value
    },
    spanStyle: {
        type: Object,
        default: () => ({})
    }
})

const stringifyValue = () => String(props.value)
const localValue = ref<string>(stringifyValue())

watch(() => props.value, () => { stringifyValue() })

const isEditing = ref<boolean>(false)

const enterEditMode = () => {
    stringifyValue()
    isEditing.value = true
}

const save = () => {
    const valueToEmit = typeof props.value === 'string' ? localValue.value : parseInt(localValue.value, 10)

    emit('value:change', valueToEmit)
    isEditing.value = false
}

</script>
<template>
    <div class="editable-span-wrapper">
        <div class="input-wrapper" v-if="isEditing">
            <TextInput v-model="localValue" />
            <CheckIconButton title="Gravar" @click="save"/>
            <CancelIconButton @click="isEditing = false" title="Cancelar"/>
        </div>
        <span v-else @click="enterEditMode" class="text-span" :style="spanStyle">{{ displayFunction(value) }}</span>
    </div>
</template>
<style lang="scss" scoped>
.editable-span-wrapper {
    width: 100%;
    .input-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: rgba(0,0,0,0.1);
        padding-right: 1rem;
    }
    .text-span {
        cursor: pointer;
    }
}
</style>
