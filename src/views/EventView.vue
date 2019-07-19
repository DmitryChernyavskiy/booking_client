<template>
    <div>
        <EventBase>{{BaseEvent.id_event}}</EventBase>
        <div class="clearfix" v-for="(item, index) in ChildEvents" :key="index">
            <EventChild :id="item.id" :time_start="item.date_start" ></EventChild>
        </div>
    </div>
</template>

<script>

import EventBase from '@/components/EventBase.vue'
import EventChild from '@/components/EventCild.vue'

export default {
  name: 'EventView',
  props: ['id'],
  components: {
    EventBase,
    EventChild
  },
  computed: {
    ChildEvents () {
      return this.$store.getters.CHILD_EVENTS
    },
    BaseEvent () {
      return this.$store.getters.BASE_EVENT
    }
  },
}
</script>
