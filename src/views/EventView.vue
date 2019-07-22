<template>
    <div>
        <div class="Event_Edit">
            <EventBase :id="id" :date_start="getDate(BaseEvent.date_start)" :time_start="getTime(BaseEvent.date_start)" :time_end="getTime(BaseEvent.date_end)" :note="BaseEvent.note"></EventBase>
        </div>
        <div class="Event_Edit">
        <button v-if="id!=='0'" @click = "all_delete_btn()">X</button>
        </div>
        <div class="Event_Edit">
            <div class="clearfix" v-for="(item, index) in ChildEvents" :key="index">
                <EventChild class="Event_Edit" :id="item.id" :date_start="item.date_start" :time_start="item.time_start" :time_end="item.time_end" ></EventChild>
            </div>
        </div>
    </div>
</template>

<script>

import EventBase from '@/components/EventBase.vue'
import EventChild from '@/components/EventCild.vue'
import * as DateTime from '../libs/Date'

export default {
  name: 'EventView',
  props: ['id', 'date_start', 'date_end', 'time_start', 'time_end'],
  components: {
    EventBase,
    EventChild
  },
  methods: {
    all_delete_btn: function () {
      this.$store.dispatch('DELETE_BASE_EVENT', this.id)
      context.dispatch('REQUEST_EVENT', '0')
      this.$router.push({ name: 'home' })
    },
    delete_btn: function (id) {
      //
    },
    getDate: function (val) {
      return DateTime.extractDate(val)
    },
    getTime: function (val) {
      return DateTime.extractTime(val)
    }
  },
  computed: {
    BaseEvent () {
      return this.$store.getters.BASE_EVENT
    },
    ChildEvents () {
      return this.$store.getters.CHILD_EVENTS
    }

  },
mounted() {
    this.$store.watch(
      (state, getters) => getters.BASE_EVENT,
      (newValue, oldValue) => {
        this.id = newValue.id_event
        //this.$router.push({ name: 'home' })
        if (newValue === 'success') {
          this.complex = {
            deep: 'some deep object',
          }
        }
      }
    )
 
   }
}
</script>

<style>
    .Event_Edit {
        display: inline-table;
    }
    .Base_Event_Edit {
        width: 285px;
        resize: none;
    }
    .repeat_num {

    }
    .repeat {
        text-align:left;
        color: white;
    }
    .repeat > label {
        width: 100px;
    }

</style>
