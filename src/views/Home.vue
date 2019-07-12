<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Calendar msg="Welcome Dimon"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'home',
  components: {
    Calendar
  }
}
</script>
