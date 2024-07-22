<script lang="ts" setup>
import TasksContainer from '@/ui/views/task/taks-container/index.vue'
import ScheduleContainer from '@/ui/views/schedule/schedule-container/index.vue'
</script>
<template>
  <main>
    <div class="wrapper">
      <div class="schedule">
        <ScheduleContainer />
      </div>
      <div class="tasks">
        <TasksContainer />
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
main {
  background-color: #f0f3f6;
  .wrapper {
    box-sizing: border-box;
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 3fr 2fr;
    column-gap: 1rem;
    
    padding: 1rem;
    > div {
      background-color: white;
    }
  }
}
</style>