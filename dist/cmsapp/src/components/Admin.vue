<template>
  <div class="container">
    <div class="row">
      <div class="col-6 m-auto mt-lg-5 pt-4 pb-4 card form-group text-left">
        <div>
        <label for="email">Email Address</label>
        <input v-model="preHashUser" id="email" class="form-control mb-lg-4" type="email" placeholder="Enter email" />
        </div>
        <label for="password">Password</label>
        <input v-model="preHashPassword" id="password" class="form-control" type="password" placeholder="Enter Password" />
        <hr/>
        {{hashedUser}} | {{hashedPassword}}
      </div>
    </div>
  </div>

</template>

<script>
import { authStore } from "./../store/Store";
import { sha256 } from './../Utils/UtilityService';

export default {
  name: "admin",
  data() {
    return {
      authState: authStore.auth,
      admin: "Admin",
      preHashUser: 'Enter email',
      preHashPassword: 'Enter Password',
      hashedUser: '',
      hashedPassword: ''
    };
  },
  created() {
    console.log("Created");
  },
  updated() {
    console.log("Updated");
  },
  beforeMount() {
    console.log("Before Mounted");
  },
  mounted() {
    console.log("Mounted");
  },
  watch: {
    preHashUser(val) {
      this.hashedUser = sha256(val);
    },
    preHashPassword(val) {
      this.hashedPassword = sha256(val);
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
