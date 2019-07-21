<template>
    <div>
        <select multiple class="calendar_events">
            <option v-for="(item, index) in events" :key="index" @click.stop = 'edit_event_btn(item.id_event)' class="calendar_event_item"> {{item.time_start}}-{{item.time_end}} </option>
        </select>
    </div>
</template>

<script>
export default {
  name: 'CalendarEventItem',
  props: ['events'],
  methods: {
    edit_event_btn: function (id) {
      this.$store.dispatch('REQUEST_EVENT', id)
      this.$router.push({ name: 'EventView', params: { id: id } })
    }
  }
}
</script>

<style>
  .calendar_events {
    height: 100px;
    width: 100%;
    background: #fffdfd00;
  },
  .calendar_event_item {
    margin: 2px;
    background: #4747fa;
    font-size: smaller;
  }
</style>
