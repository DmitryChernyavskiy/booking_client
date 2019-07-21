<template>
    <div>
        <div class="Event_Edit">
            <EventBase :id="BaseEvent.id_event" :date_start="BaseEvent.date_start" :time_start="BaseEvent.time_start" :time_end="BaseEvent.time_end" :note="BaseEvent.note"></EventBase>
            <br>
            <div class="repeat">
                <input type="checkbox" id="recursiv" v-model="recursive">
                <label for="recursiv">create serial event</label>
            </div>
            <div v-if="recursive">
                <div class="repeat">
                    <input type="radio" id="everyday" value="day" v-model="typeRepeat">
                    <label for="everyday">everyday</label>
                    <input  class="repeat_num" v-if="typeRepeat==='day' "v-model.number="repeatNum" type="number" min=1 max=4>
                </div>
                <div class="repeat">
                    <input type="radio" id="everyweek" value="week" v-model="typeRepeat">
                    <label for="everyweek">every week</label>
                    <input  class="repeat_num" v-if="typeRepeat==='week' "v-model.number="repeatNum" type="number" min=1 max=4>
                </div>
                <div class="repeat">
                    <input type="radio" id="everymonth" value="month" v-model="typeRepeat">
                    <label for="everymonth">every month</label>
                    <input  class="repeat_num" v-if="typeRepeat==='month' "v-model.number="repeatNum" type="number" min=1 max=4>
                </div>
            </div>
        </div>
        <div class="Event_Edit">
        <button @click = "all_delete_btn(BaseEvent.id_event)">X</button>
        </div>
        <div class="Event_Edit">
            <div class="clearfix" v-for="(item, index) in ChildEvents" :key="index">
                <EventChild class="Event_Edit" :id="item.id" :date_start="item.date_start" :time_start="item.time_start" :time_end="item.time_end" ></EventChild>
                <button class="Event_Edit" @click = "delete_btn(item.id)">X</button>
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
  props: ['id', 'recursive', 'typeRepeat', 'repeatNum','date_start','date_end','time_start','time_end'],
  components: {
    EventBase,
    EventChild
  },
  methods: {
    all_delete_btn: function () {
      //
    },
    delete_btn: function () {
      //
    }
  },
  computed: {
    BaseEvent () {
      return this.$store.getters.BASE_EVENT
    },
    ChildEvents () {
      return this.$store.getters.CHILD_EVENTS
    }
    
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
        text-align:left
    }
    .repeat > label {
        width: 100px;
    }

</style>
