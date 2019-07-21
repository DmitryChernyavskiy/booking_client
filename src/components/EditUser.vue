<template>
    <div>
        <div>
            <input class="User_item" v-if="id!=='0'" type="checkbox" id="blocked" v-model="blocked">
            <div class="User_item" v-else></div>
            <div class="User_item User_item_add">{{id}}</div>
            <input class="User_item User_item_add" name="name" v-model.trim="name" type="text" min=5>
            <input class="User_item User_item_add" v-model.trim="password" type="text" min=3>
            <input class="User_item User_item_add" v-validate="'required|email'" name="enail" v-model.trim="email" type="text" min=3>
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
    .User_item_add {
        background-color: white;
    }

</style>
