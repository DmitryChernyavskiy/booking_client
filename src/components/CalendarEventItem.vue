<template>
    <div>
        <select multiple class="calendar_events">
            <option class="calendar_event_item" v-for="(item, index) in events" :key="item.id" @click.stop = "edit_event_btn()"> {{item.date_start}}-{{item.date_end}} </option>
        </select>
    </div>
</template>

<script>
export default {
  name: 'CalendarEventItem',
  props: ['events'],
  methods: {
    edit_event_btn: function () {
      this.$router.push({ name: 'EventView', params: { id: 111 } })
    }
  }
}
</script>

<style>
  .calendar_events {
    height: 100px;
    width: 100%;
  },
  .calendar_event_item {
    margin: 2px;
    background-color: #0e1c4f45;
    font-size: smaller;
  }
</style>