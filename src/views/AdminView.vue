<template>
  <div class="AdminView">
    <h1>User editing form</h1>
    <div>
        <p class="User_desc1">block</p>
        <p class="User_desc">ID</p>
        <p class="User_desc">name</p>
        <p class="User_desc">password</p>
        <p class="User_desc">e-mail</p>
    </div>
    <EditUser class="User_new" :id="'0'" :blocked="false" :password="'-'"></EditUser>
    <div class="clearfix" v-for="(item, index) in Users" :key="index">
        <EditUser :id="item.id" :blocked="item.blocked" :name="item.name" :password="item.password" :email="item.email" ></EditUser>
    </div>
  </div>
</template>

<script>
import EditUser from '@/components/EditUser.vue'

export default {
  name: 'AdminView',
  props: {},
  components: {
    EditUser
  },
  computed: {
    Users () {
      return this.$store.getters.USERS
    }
  }
}
</script>

<style>
    .User_desc {
        width: 160px;
        display: inline-table;
        color: #42b983;
        font-weight: bold;
        font-size: initial;
        margin-bottom: 2px;
    }
    .User_desc1 {
        width: 80px;
        display: inline-table;
        color: #42b983;
        font-weight: bold;
        font-size: initial;
        margin-bottom: 2px;
    }
    .User_new {
        margin-bottom: 20px;
    }
</style>
