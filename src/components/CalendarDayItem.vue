<template>
    <span class="calendar_item" :class="{'alien-day': alien_day, 'day-off': day_off}" @click = "test_btn()">
      <div>{{val.name}}</div>
      <div>event test</div>
    </span>
</template>

<script>
export default {
  name: 'CalendarDayItem',
  props: ['val', 'index', 'day_off', 'alien_day'],
  methods: {
    test_btn: function () {
      this.$router.push({ name: 'EventView', params: { id: 123 } })
    }
  }
}
</script>

<style>
  .calendar_item {
      width: 125px;

      border-right-color: brown;
      border-right: 1px solid;
    }
    .day-off {
            color: red;
        }
    .alien-day {
        background: #cccbc82e
    }
</style>
