<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { PropType } from 'vue'

defineProps({
    icon: {
        type: Object as PropType<IconDefinition>,
        default: '',
    },
    color: {
        type: String,
        default: 'green',
    },
})
const emit = defineEmits(['click'])
</script>
<template>
    <FontAwesomeIcon :icon="icon" :color="color" @click="emit('click')" />
</template>
