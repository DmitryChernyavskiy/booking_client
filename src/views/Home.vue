<template>
    <div style="background: #fdf5dd; display: inline-block;">
        <div v-for="(item, index) in listday" :key="index">
            <CalendarWeekItem :val="index" :item="item"></CalendarWeekItem>
            <span :key="text">{{ text }}</span>
        </div>
    </div>
</template>

<script>

import config from '../libs/config'
import CalendarWeekItem from '@/components/CalendarWeekItem.vue'
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    eeekend: function (val) {
      return (val === config.STAT_WEEKEND || val === config.STAT_HIGHDAY)
    },
    alienday: function (val) {
      return (val === config.STAT_ALIENDAY)
    }
  },
  computed: {
    listday () {
      return this.$store.getters.LIST_DAY
    }
  },
  components: {
    CalendarWeekItem
  }
}
</script>
