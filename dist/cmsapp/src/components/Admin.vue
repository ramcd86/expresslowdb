<template>
  <div>{{this.admin}}</div>
</template>

<script>
import { authStore } from "./../store/Store";

export default {
  name: "admin",
  data() {
    return {
      authState: authStore.auth,
      admin: "Admin"
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
  watch: {}
};
</script>

<style lang="sass" scoped>

</style>
