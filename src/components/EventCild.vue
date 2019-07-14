<template>
    <div>
        <input type="date" v-model="date_start">
        <input type="time" min="0:00" max="24:00" v-model="time_start">
        <input type="time" min="0:00" max="24:00"v-model="time_end">
    </div>
</template>

<script>
export default {
  name: 'EventChild',
  props: ['id','date_start','date_end', 'time_start','time_end']
}
</script>