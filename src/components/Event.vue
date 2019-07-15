<template>
    <div>
    </div>
</template>

<script>
export default {
  name: 'Event',
  props: ['val', 'index', 'day_off', 'alien_day'],
  methods: {
    test_btn: function () {
      this.$router.push({ name: 'EventView', params: { id: 123 } })
    }
  }
}
</script>