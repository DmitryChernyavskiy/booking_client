<template>
    <span class="calendar_item" :class="{'alien-day': alien_day, 'day-off': day_off}" @click = "new_event_btn()">
      <div>{{val.name}}</div>
      <CalendarEventItem v-if='val.events.length>0' :events="val.events"></CalendarEventItem>
    </span>
</template>

<script>
import CalendarEventItem from '@/components/CalendarEventItem.vue'

export default {
  name: 'CalendarDayItem',
  props: ['val', 'index', 'day_off', 'alien_day'],
  methods: {
    new_event_btn: function () {
        if (this.day_off || this.alien_day){
            return;
        }
      this.$router.push({ name: 'EventView', params: { id: "0" } })
    }
  },
  components: {
    CalendarEventItem
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
