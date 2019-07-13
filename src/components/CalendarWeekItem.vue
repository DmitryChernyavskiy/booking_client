<template>
    <span class="calendar_first_item"> {{val}}</span>
</template>

<script>
export default {
  name: 'CalendarWeekItem',
  props: ['val', 'index']
}
</script>
