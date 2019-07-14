<template>
  <div>
      <button @click = "minus_btn()"><</button>
      <span class="month_item">{{month}}</span>
      <button @click = "plus_btn()">></button>
  </div>
</template>

<script>
export default {
  name: 'CalendarMounthSelect',
  props: ['month'],
  methods: {
    plus_btn: function () {
      this.$store.commit('ADD_MOUNTH', 1)
    },
    minus_btn: function () {
      this.$store.commit('ADD_MOUNTH', -1)
    }
  }
}
</script>
