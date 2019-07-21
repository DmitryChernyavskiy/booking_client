<template>
    <div>
        <div>
            <input type="date" v-model="dateStart">
            <input type="time" min="0:00" max="24:00" v-model="time_start">
            <input type="time" min="0:00" max="24:00" v-model="time_end">
        </div>
        <textarea class="Base_Event_Edit" v-model="note" placeholder="Enter description for Event"></textarea>
    </div>
</template>

<script>
// <timeselector v-model="time_start"></timeselector>
// import Timeselector from 'vue-timeselector';

export default {
  name: 'EventBase',
  props: ['id', 'note', 'date_start', 'time_start', 'time_end'],
  components: {
    // Timeselector
  },
  computed: {
    dateStart: {
      set: function (val) {
        this.date_start = val
      },
      get: function () {
        return this.$store.getters.BASE_EVENT.date_start
      }
    }
  }
}
</script>
