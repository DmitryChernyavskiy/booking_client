<template>
  <div class="condition allcondition">
    <p>Mounch: </p>
    <div >
      <button @click = "minus_btn()"><</button>
      <div class="month_item">{{month}}</div>
      <button @click = "plus_btn()">></button>
    </div>
    <p>room: </p>
    <select v-model="CurRoom">
        <option v-for="(item, index) in Rooms" :key="index"> {{item.name}}</option>
    </select>
    <p>user orders: </p>
    <select v-model="CurUsers">
        <option value= "*"> all</option>
        <option v-for="(item, index) in Users" :key="index"> {{item.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CalendarMounthSelect',
  props: ['month', 'curRoom'],
  methods: {
    plus_btn: function () {
      this.$store.dispatch('ADD_MOUNTH', 1)
    },
    minus_btn: function () {
      this.$store.dispatch('ADD_MOUNTH', -1)
    }
  },
  computed: {
    Rooms () {
      return this.$store.getters.ROOMS
    },
    Users () {
      return this.$store.getters.USERS
    },
    CurRoom: {
      set: function (room) {
        let Rooms = this.$store.getters.ROOMS
        for (let j = 0; j < Rooms.length; j++) {
          if (Rooms[j].name === room) {
            this.$store.commit('CUR_ROOM', Rooms[j])
            this.$store.dispatch('ADD_MOUNTH', 0)
            break
          }
        }
      },
      get: function () {
        let curRoom = this.$store.getters.CUR_ROOM
        return (typeof (curRoom) === 'object' ? curRoom.name : '')
      }
    },
    CurUsers: {
      set: function (user) {
        if (user === '*') {
          this.$store.commit('CUR_USER', undefined)
          this.$store.dispatch('ADD_MOUNTH', 0)
        } else {
          let Users = this.$store.getters.USERS
          for (let j = 0; j < Users.length; j++) {
            if (Users[j].name === user) {
              this.$store.commit('CUR_USER', Users[j])
              this.$store.dispatch('ADD_MOUNTH', 0)
              break
            }
          }
        }
      },
      get: function () {
        let curUser = this.$store.getters.CUR_USER
        return (typeof (curRoom) === 'object' ? curUser.name : '*')
      }
    }
  }
}
// #0080ff9e
</script>

<style>
    .allcondition * {
        display: inline;
    }
    .condition * {
        margin-bottom: 10px;
    }
    .month_item {
      color: #10f338;
      //background: #DDDDDD
    }
</style>
