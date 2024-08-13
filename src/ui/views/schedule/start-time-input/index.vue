<script setup lang="ts">
import { useScheduleManager } from '@/providers'
import { DateHandler } from '@/providers/libraries/day-js'
import { ClockIcon, PrimaryButton, TextInput } from '@/ui/components'
import { ref, watch } from 'vue'

const {
    currentStartDateTime,
    currentFinishDateTime,
    setStartTimeToNow,
    setStartTime,
    currentDateTime,
} = useScheduleManager()

let time = ref('')

const updateTimeFromRemote = () => {
    time.value = DateHandler.formatToTime(currentStartDateTime.value)
}

updateTimeFromRemote()

watch(currentStartDateTime, () => {
    updateTimeFromRemote()
})

const setTime = () => {
    if (time.value) setStartTime(time.value)
}
</script>

<template>
    <div class="wrapper">
        <div class="input-wrapper">
            <div class="input-form">
                <div class="time-input">
                    <TextInput
                        type="time"
                        v-model="time"
                        label="Horário de início:"
                    />
                </div>
            </div>
            <PrimaryButton @click="setTime">Calcular</PrimaryButton>
            <PrimaryButton @click="setStartTimeToNow"
                >Calcular a partir de agora</PrimaryButton
            >
        </div>
        <div class="time-wrapper">
            <span class="current-time">
                <ClockIcon />
                {{ DateHandler.formatToTime(currentDateTime) }}
            </span>
            <span class="time-interval">
                {{ DateHandler.formatToTime(currentStartDateTime) }} -
                {{ DateHandler.formatToTime(currentFinishDateTime) }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .input-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 1rem;
        .input-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: flex-start;
            align-items: flex-start;
            .time-input {
                width: 150px;
            }
        }
    }
    .time-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        align-items: flex-end;
        .current-time {
            font-size: 1.8rem;
            color: green;
            font-weight: 700;
        }
        .time-interval {
            font-size: 1.5rem;
            color: green;
            font-weight: 500;
        }
    }
}
</style>
