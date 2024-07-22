<script lang="ts" setup>
import { computed, PropType } from 'vue'
import type { CalculatedScheduleType } from '@/providers'
import { ArrowDownButton, ArrowUpButton, EditableSpan, TrashButton } from '@/ui/components';
import { DateHandler } from '@/providers/libraries/day-js';
import { StringUtils } from '@/providers/utils/string';
const props = defineProps({
    schedule: {
        type: Object as PropType<CalculatedScheduleType>,
        default: () => ({})
    },
    showUpButton: {
        type: Boolean,
        default: true,
    },
    showDownButton: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['schedule:remove','schedule:move:up', 'schedule:move:down', 'schedule:update'])

const removeSchedule = () => { emit('schedule:remove', props.schedule.id)}
const moveTaskUp = () => { emit('schedule:move:up', props.schedule.id)}
const moveTaskDown = () => { emit('schedule:move:down', props.schedule.id)}

const progressBarStyle = computed(() => {
    let backgroundColor
    if (props.schedule.percentual > 90) {
        backgroundColor = 'red'
    } else if (props.schedule.percentual > 70) {
        backgroundColor = 'orange'
    } else {
        backgroundColor = 'green'
    }

    return {
        width: `${props.schedule.percentual}%`,
        backgroundColor
    }
})

const updateValues = ($event : any, field: string) => {
    emit('schedule:update', { id: props.schedule.id, [field] : $event })
}

</script>
<template>
    <div>
        <span v-if="schedule.percentual" class="progress" :style="progressBarStyle">
            {{ schedule.percentual.toFixed(1) }}%
            {{ schedule.percentual > 10 ? ` ( ${StringUtils.stringifyTime(schedule.remainingMinutes)} restantes )` : '' }}
        </span>
        <div class="schedule-wrapper" :class="{now: schedule.isNow}">            
            <div class="time-wrapper">
                <span class="start-time">{{ DateHandler.formatToTime(schedule.startTime) }}</span>
                <span class="finish-time">{{ DateHandler.formatToTime(schedule.finishTime) }}</span>
            </div>
            <div class="time">
                <EditableSpan 
                    :value="schedule.minutes" 
                    @value:change="updateValues($event, 'minutes')" 
                    :display-function="StringUtils.stringifyTime" 
                    :span-style="{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        padding: '2px 10px',
                        borderRadius: '8px'
                    }"/>
            </div>            
            <div class="name">
                <EditableSpan :value="schedule.name" @value:change="updateValues($event, 'name')" />
            </div>
            <ArrowUpButton @click="moveTaskUp" v-if="showUpButton"/>
            <ArrowDownButton @click="moveTaskDown" v-if="showDownButton"/>
            <TrashButton @click="removeSchedule" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.progress{
    height:20px;
    border-radius: 10px;
    width: 100%;
    display: inline-block;
    font-size: 0.9rem;
    color: white;
    font-weight: 700;
}
.schedule-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    border-left: 3px solid green;
    padding: 1rem;
    box-shadow: 0px 0px 13px 5px #f0f3f6;    
    &.now {
        background-color: rgba(0,255,0,0.3);
    }
    .time-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: rgba(0,0,0,0.1);
        padding: 1rem;
        .start-time {
            font-weight: 500;
            color: green;
        }
        .finish-time {
            font-weight: 500;
            color: red;
        }
    }
    .name {
        flex: 1;
        text-align: left;
    }
}
</style>