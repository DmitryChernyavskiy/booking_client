<template>
    <div>
        <div>
            <input type="date" v-model="date_start">
            <input type="time" min="0:00" max="24:00" v-model="time_start">
            <input type="time" min="0:00" max="24:00" v-model="time_end">
        </div>
        <textarea class="Base_Event_Edit" v-model="note" placeholder="Enter description for Event"></textarea>
        <br>
        <div class="repeat" v-if="id==='0'">
            <input type="checkbox" id="recursiv" v-model="recursive">
            <label for="recursiv">create serial event</label>
        </div>
        <div v-if="recursive">
            <div class="repeat">
                <input type="radio" id="everyday" value="day" v-model="typeRepeat">
                <label for="everyday">everyday</label>
                <input  class="repeat_num" v-if="typeRepeat==='day'" v-model.number="repeatNum" type="number" min=1 max=4>
            </div>
            <div class="repeat">
                <input type="radio" id="everyweek" value="week" v-model="typeRepeat">
                <label for="everyweek">every week</label>
                <input  class="repeat_num" v-if="typeRepeat==='week'" v-model.number="repeatNum" type="number" min=1 max=4>
            </div>
            <div class="repeat">
                <input type="radio" id="everymonth" value="month" v-model="typeRepeat">
                <label for="everymonth">every month</label>
                <input  class="repeat_num" v-if="typeRepeat==='month'" v-model.number="repeatNum" type="number" min=1 max=4>
            </div>
        </div>
        <button v-if="id=='0'" @click = "create_btn()">Create</button>
    </div>
</template>

<script>
// <timeselector v-model="time_start"></timeselector>
// import Timeselector from 'vue-timeselector';

export default {
  name: 'EventBase',
  props: ['id', 'note', 'date_start', 'time_start', 'time_end', 'recursive', 'typeRepeat', 'repeatNum'],
  components: {
    // Timeselector
  },
  computed: {
  },
  methods: {
    create_btn: function (id) {
      let event = []
      let CurData = new Date(date_start)
      let year = CurData.getFullYear()
      let mounth = CurData.getMonth()
      let dat = CurData.getDate()

      let date_start1 = DataToSql2(year, mounth, dat, time_start)
      let date_end1 = DataToSql2(year, mounth, dat, time_end)
      event.push({
        date_start: date_start1,
        date_end: date_end1,
        note: this.note,
        user: this.note,
        name: this.note,
        date_start: date_start1,
        date_end: date_end1
      })

      if (this.recursive) {
        for (let i = 1; i <= this.repeatNum; i++) {
          CurData.setFullYear(year)
          CurData.setMonth(mounth + (this.typeRepeat === 'month' ? i : 0))
          CurData.setDate(dat + (this.typeRepeat === 'day' ? i : (this.typeRepeat === 'week' ? i * 7 : 0)))
          year = CurData.getFullYear()
          mounth = CurData.getMonth()
          dat = CurData.getDate()
          dat = (CurData.getDay() === 0 ? dat + 1 : (CurData.getDay() === 6 ? dat + 2 : 0))

          date_start = DataToSql2(year, mounth, dat, time_start)
          date_end = DataToSql2(year, mounth, dat, time_end)
          event.push({
            date_start: date_start1,
            date_end: date_end1,
            note: this.note,
            user: this.note,
            name: this.note,
            date_start: date_start,
            date_end: date_end
          })
        }
      }
      this.$store.dispatch('CREATE_EVENTS', 0)
    }
  }
}
</script>
