<template>
    <div class="login">
        <h1>Autorisation form</h1>
         <p>admin (pass: admin) / user10 (pass:123)</p>
        <div v-if="id=='0'">
            <p>User:</p>
            <input type="text" v-model="name">
            <p>password:</p>
            <input class="login_text" type="password" v-model="password"><br>
            <button @click = "login_btn()">Login</button>
            <p class="errors">{{errorsNsg}}</p>
        </div>
        <div v-else>
            <p>User:{{name}}</p>
            <button @click = "logout_btn()">Logout</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'login',
  props: ['id', 'name', 'password'],
  methods: {
    login_btn: function () {
      this.$store.dispatch('CHECK_USER', { user: this.name, password: this.password })
    },
    logout_btn: function () {
      this.$store.dispatch('RESET_USER', '')
    },
    updateProps: function (id, name, password) {
      this.id = id
      this.name = name
      this.password = password
    },
    updatePropsErr: function (err) {
      this.errorsMsg = err
    }
  },

  computed: {
    errorsNsg () {
      return this.$store.getters.ERROR_MSG
    }
  },

  created () {
    let val = this.$store.getters.USER
    this.id = val.id
    this.name = val.name
    this.password = val.password
  },

  mounted () {
    this.$store.watch(
      (state, getters) => getters.USER,
      (newValue, oldValue) => {
        this.updateProps(newValue.id, newValue.name, newValue.password)
        if (newValue.id !== oldValue.id) {
          this.$router.push({ name: 'home' })
        }
        if (newValue === 'success') {
          this.complex = {
            deep: 'some deep object'
          }
        }
      }
    )
    this.$store.watch(
      (state, getters) => getters.ERROR_MSG,
      (newValue, oldValue) => {
        this.updatePropsErr(newValue)
        if (newValue === 'success') {
          this.complex = {
            deep: 'some deep object'
          }
        }
      }
    )
  }
}
</script>

<style>
    .login {
        color: #42b983;
        font-size: larger;
        margin: 10px 5px 5px 5px;
    }
    .login_text {
        margin: 1px 1px 15px 1px;
    }
    .errors {
        color: red;
    }
</style>
