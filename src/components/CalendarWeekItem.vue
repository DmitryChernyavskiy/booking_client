<template>
    <span class="calendar_item"> {{val}}</span>
</template>

<script>
export default {
  name: 'CalendarWeekItem',
  props: ['val']
}
</script>

<style>
  .calendar_item {
    width: 90px;  
  }
</style>
