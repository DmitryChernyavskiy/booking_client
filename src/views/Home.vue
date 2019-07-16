<template>
    <div class="caendar">
        <CalendarMounthSelect :month="obj.strmonth"></CalendarMounthSelect>
        <div class="clearfix" v-for="(item, index) in listday" :key="index">
            <CalendarWeekItem :val="index" ></CalendarWeekItem>
            <CalendarDayItem v-for="(item1, index1) in item" :index="index1" :val="item1" :key="index1" :alien_day = "item1.alienday" :day_off = "item1.weekeend"></CalendarDayItem>
        </div>
    </div>
</template>

<script>

import CalendarWeekItem from '@/components/CalendarWeekItem.vue'
import CalendarDayItem from '@/components/CalendarDayItem.vue'
import CalendarMounthSelect from '@/components/CalendarMounthSelect.vue'
// @ is an alias to /src

export default {
  name: 'home',
  computed: {
    listday () {
      return this.$store.getters.LIST_DAY
    },
    obj () {
      return this.$store.getters.OBJ
    }
  },
  components: {
    CalendarWeekItem,
    CalendarDayItem,
    CalendarMounthSelect
  }
}
</script>

<style>
  .clearfix::after {
    display: block; content: "";
    clear: both;
  }
  .calendar_item {
      float: left;
      height: 120px;
      text-align: left;
      display: inline-block;
      border-bottom-color: darkgoldenrod;
      border-bottom: 1px solid;
      margin: 2px 2px;
    }
    .caendar{
      min-width: 925px;
    }
</style>
