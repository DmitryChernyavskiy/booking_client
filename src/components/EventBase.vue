<template>
    <div>
        <div>
            <input type="date" v-model="date_start" :disabled="id!=='0'">
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
                <input  class="repeat_num" id="everydayRep" v-if="typeRepeat==='day'" v-model.number="repeatNum" type="number" min=1 max=4>
                <label for="everydayRep" v-if="typeRepeat==='day'">reps</label>
            </div>
            <div class="repeat">
                <input type="radio" id="everyweek" value="week" v-model="typeRepeat">
                <label for="everyweek">every week</label>
                <input  class="repeat_num" id="everyweekRep" v-if="typeRepeat==='week'" v-model.number="repeatNum" type="number" min=1 max=4>
                <label for="everyweekRep" v-if="typeRepeat==='week'">reps</label>
            </div>
            <div class="repeat">
                <input type="radio" id="everymonth" value="month" v-model="typeRepeat">
                <label for="everymonth">every month</label>
                <input  class="repeat_num" id="everymonthRep" v-if="typeRepeat==='month'" v-model.number="repeatNum" type="number" min=1 max=4>
                <label for="everymonthRep" v-if="typeRepeat==='month'">reps</label>
            </div>
        </div>
        <button v-if="id=='0'" @click = "create_btn()">Create</button>
        <p class="errors">{{errorsNsg}}</p>
    </div>
</template>

<script>
// <timeselector v-model="time_start"></timeselector>
// import Timeselector from 'vue-timeselector';
import * as DateTime from '../libs/Date'

export default {
  name: 'EventBase',
  props: ['id', 'note', 'date_start', 'time_start', 'time_end', 'recursive', 'typeRepeat', 'repeatNum'],
  components: {
    // Timeselector
  },
  computed: {
    errorsNsg () {
      return this.$store.getters.ERROR_MSG
    }
  },
  methods: {
    create_btn: function (id) {
      let errors = ''
      if ((this.note.length === 0 || !this.note.trim())){
        errors = 'Description ("note") is not defined\n'
      }
      if (this.time_start>=this.time_end){
        errors = errors + 'End time must be greater than start time\n'
      }

      if (errors !== ''){
        this.$store.commit('ERROR_MSG', 'Error: ' + errors)
        return
      }
      let event = []
      let CurData = new Date(this.date_start)
      let year = CurData.getFullYear()
      let mounth = CurData.getMonth()
      let dat = CurData.getDate()

      let dateStart1 = DateTime.DataToSql2(year, mounth + 1, dat, this.time_start)
      let dateEnd1 = DateTime.DataToSql2(year, mounth + 1, dat, this.time_end)
      let task = {
        base_date_start: dateStart1,
        base_date_end: dateEnd1,
        base_note: this.note,
        id_event: '0',
        id_user: this.note,
        id_room: this.$store.getters.CUR_ROOM.id,
        date_start: dateStart1,
        date_end: dateEnd1,
        checked: undefined,
        created: undefined
      }
      event.push(task)

      if (this.recursive) {
        for (let i = 1; i <= this.repeatNum; i++) {
          CurData.setFullYear(year)
          CurData.setMonth(mounth + (this.typeRepeat === 'month' ? 1 : 0))
          CurData.setDate(dat + (this.typeRepeat === 'day' ? 1 : (this.typeRepeat === 'week' ? 7 : 0)))
          year = CurData.getFullYear()
          mounth = CurData.getMonth()
          dat = CurData.getDate()
          dat = dat + (CurData.getDay() === 0 ? 1 : (CurData.getDay() === 6 ? 2 : 0))
          let dateStart = DateTime.DataToSql2(year, mounth + 1, dat, this.time_start)
          let dateEnd = DateTime.DataToSql2(year, mounth + 1, dat, this.time_end)
          task = {
            base_date_start: dateStart1,
            base_date_end: dateEnd1,
            base_note: this.note,
            id_event: '0',
            id_user: this.note,
            id_room: this.$store.getters.CUR_ROOM.id,
            date_start: dateStart,
            date_end: dateEnd,
            checked: undefined,
            created: undefined
          }
          event.push(task)
        }
      }
      this.$store.dispatch('CREATE_EVENTS', event)
    }
  }
}
</script>

<style>
    .errors {
        color: red;
    }
</style>
