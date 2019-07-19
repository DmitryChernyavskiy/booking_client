<template>
    <div>
        <input type="date" v-model="date_start">
        <timeselector v-model="time_start"></timeselector>
        <input type="time" min="0:00" max="24:00" v-model="time_end">
    </div>
</template>

<script>
import Timeselector from 'vue-timeselector';

export default {
  name: 'EventBase',
  props: ['id', 'date_start', 'date_end', 'time_start', 'time_end'],
  components: {
    Timeselector
  }
}
</script>
