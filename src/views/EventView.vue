<template>
    <div>
        <EventBase></EventBase>
        <div>
          <EventChild></EventChild>
        </div>
    </div>
</template>

<script>

import EventBase from '@/components/EventBase.vue'
import EventChild from '@/components/EventCild.vue'

export default {
  name: 'EventView',
  props: ['id','event'],
  components: {
    EventBase,
    EventChild
  }
}
</script>