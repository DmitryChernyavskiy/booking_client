<template>
    <span class="calendar_item" :class="{'alien-day': alien_day, 'day-off': day_off}" @click = "new_event_btn()">
      <div>{{val.name}}</div>
      <CalendarEventItem v-if='val.events.length>0' :events="val.events"></CalendarEventItem>
    </span>
</template>

<script>
import CalendarEventItem from '@/components/CalendarEventItem.vue'
import * as DateTime from '../libs/Date'

export default {
  name: 'CalendarDayItem',
  props: ['val', 'index', 'day_off', 'alien_day'],
  methods: {
    new_event_btn: function () {
      if (this.day_off || this.alien_day) {
        return
      }
      let room = this.$store.getters.CUR_ROOM
      if (room === undefined) {
        return
      }
      let date = new Date()
      date.setTime(this.val.date)
      let year = date.getFullYear()
      let mounth = date.getMonth()

      this.$store.commit('NEW_BASE_EVENT', { date_create: '',
        date_end: '',
        date_start: DateTime.DataToSql(year, mounth+1, this.val.name),
        day_of_month: this.val.name,
        id: '0',
        id_event: '0',
        name: room.name,
        note: '' })
      this.$router.push({ name: 'EventView', params: { id: '0' } })
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

      background: #a9a9a97d;
      border-right-color: brown;
      border-right: 1px solid;
    }
    .day-off {
            color: red;
        }
    .alien-day {
        background: #30302e7a
    }
</style>
