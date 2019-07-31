<template>
    <div>
        <select multiple class="calendar_events">
            <option v-for="(item, index) in events" :key="index" @click.stop = 'edit_event_btn(item.id_event,item.id_user)' class="calendar_event_item"> {{item.time_start}}-{{item.time_end}} </option>
        </select>
    </div>
</template>

<script>
export default {
  name: 'CalendarEventItem',
  props: ['events'],
  methods: {
    edit_event_btn: function (id, id_user) {
      if (this.$store.getters.USER.role !== 'admin' && this.$store.getters.USER.id !== id_user) {
        if (this.$store.getters.USER.id === '0') {
          alert('It is forbidden to change orders to unauthorized users')
        } else {
          alert("It is forbidden to change other people's orders")
        }
        return
      }
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
