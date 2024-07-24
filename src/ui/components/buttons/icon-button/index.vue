<script lang="ts" setup>
import type { PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

defineProps({
    icon: {
        type: Object as PropType<IconDefinition>,
        required: true,
    },
    color: {
        type: String,
        default: 'green',
    },
})

const emit = defineEmits(['click'])
</script>
<template>
    <span>
        <FontAwesomeIcon :icon="icon" :color="color" @click="emit('click')" />
    </span>
</template>
<style lang="scss" scoped>
span {
    cursor: pointer;
}
</style>
