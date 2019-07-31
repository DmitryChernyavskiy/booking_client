<template>
    <div>
        <input type="date" v-model="date_start" :disabled="true">
        <input type="time" min="0:00" max="24:00" v-model="time_start" :disabled="true">
        <input type="time" min="0:00" max="24:00" v-model="time_end" :disabled="true">
    </div>
</template>

<script>
export default {
  name: 'EventChild',
  props: ['id', 'date_start', 'time_start', 'time_end']
}
</script>
