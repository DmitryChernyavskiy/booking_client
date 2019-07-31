<template>
    <div>
        <div>
            <input class="User_item1" v-if="id!=='0'" type="checkbox" id="blocked" v-model="blockedConv">
            <p class="User_item1" v-else>New user</p>
            <div class="User_item User_item_add">{{id}}</div>
            <input class="User_item User_item_add" name="name" v-model.trim="name" type="text" min=5>
            <input class="User_item User_item_add" v-model.trim="password" type="text" min=3>
            <input class="User_item User_item_add" v-validate="'required|email'" name="enail" v-model.trim="email" type="text" min=3>
            <button @click = "mail_btn()">mail to</button>
            <button @click = "save_btn()">Save</button>

        </div>
        <span>{{ errors.first('email') }}</span>
    </div>
</template>

<script>
export default {
  name: 'EditUser',
  props: ['id', 'blocked', 'name', 'password', 'email', 'snackbar'],
  methods: {
    mail_btn: function () {
      window.location.href = 'mailto:' + this.email
    },
    save_btn: function () {
      if (this.id === '0') {
        this.$store.dispatch('ADD_USER', {
          blocked: this.blocked,
          user: this.name,
          password: this.password,
          email: this.email })
      } else {
        this.$store.dispatch('UPD_USER', {
          id: this.id,
          blocked: this.blocked,
          user: this.name,
          password: this.password,
          email: this.email })
      }
    }
  },
  computed: {
    blockedConv: {
      // геттер:
      get: function () {
        return (this.blocked === '1')
      },
      // сеттер:
      set: function (newValue) {
        this.blocked = (newValue ? '1' : '0')
      }
    }
  }
}
</script>

<style>
    .User_item {
        width: 160px;
        height: 20px;
        display: inline-table;
        padding: 1px 0px;
        margin: 1px;
    }
    .User_item1 {
        width: 80px;
        height: 20px;
        display: inline-table;
        padding: 1px 0px;
        margin: 1px 1px 1px 100px;
        color: red
    }
    .User_item_add {
        background-color: white;
    }

</style>
