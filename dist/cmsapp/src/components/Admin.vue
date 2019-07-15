<template>
  <div class="container">
    <div v-if="state.isLoggedIn === false" class="row">
      <div class="col-6 m-auto mt-lg-5 pt-4 pb-4 card form-group text-left">
        <div class="pb-3">
        <label for="email">Email Address</label>
        <input v-model="preHashUser" id="email" :class="['form-control', 'mb-lg-4', securityFailure]" type="email" placeholder="Enter email" />
        </div>
        <div class="pb-2">
        <label for="password">Password</label>
        <input v-model="preHashPassword" id="password" :class="['form-control', securityFailure]" type="password" placeholder="Enter Password" />
        </div>
        <hr  class="pb-2"/>
        <div class="row">
          <div class="col-12 text-center pb-2"><button class="btn btn-primary" @click="login()">Login</button></div>
        </div>
        <div v-if="securityFailure == 'is-invalid'" class="row">
          
          <div class="col-12 text-center pb-2">
            <hr class="pb-2"/>
            {{this.loginStatus}}</div>
        </div>
      </div>
    </div>
    <div v-if="state.isLoggedIn === true" class="row">
      <div class="col-6 m-auto mt-lg-5 pt-4 pb-4 card form-group text-left">
        <div>
        <label for="email">Email Address</label>
        <input v-model="preHashUser" id="email" class="form-control mb-lg-4" type="email" placeholder="Enter email" />
        </div>
        <label for="password">Password</label>
        <input v-model="preHashPassword" id="password" class="form-control" type="password" placeholder="Enter Password" />
        <hr/>
        <div class="row">
          <div class="col-12 text-center"><button class="btn btn-danger" @click="logout()">Logout</button></div>
        </div>
        <hr>
        <div class="text-center is-valid">{{this.loginStatus}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { securityStore, securityMutators } from "./../store/Store";
import { sha256, config, httpPost } from './../Utils/UtilityService';

export default {
  name: "admin",
  data() {
    return {
      state: securityStore.auth,
      // mutators: securityMutators,
      admin: "Admin",
      preHashUser: '',
      preHashPassword: '',
      hashedUser: '',
      hashedPassword: '',
      loginStatus: '',
      securityFailure: '',
      currentCookie: {
        cname: '',
        ctoken: ''
      }
    };
  },
  created() {
    console.log("Created");

    this.cookieCheck();
  },
  updated() {
    console.log("Updated");
    
  },
  beforeMount() {
    console.log("Before Mounted");
  },
  mounted() {
    console.log("Mounted");
    console.log(this.state.isLoggedIn);
  },
  methods: {
    login: function() {
      httpPost(`${config.API}/login`, {email: this.hashedUser, password: this.hashedPassword}).then((resp) => {
        const response = JSON.parse(resp);
        console.log('response', response);
        if (response == 401) {
          this.loginStatus = "login failed.";
          this.securityFailure = "is-invalid";
        } else {
          this.loginStatus = "login successful";
          securityMutators.mutateAuth({
            actionType: 'setToken',
            payload: response.token
          })
          securityMutators.mutateAuth({
            actionType: 'setLoggedIn',
            payload: true
          })
          document.cookie = `cdata=cmsauthcookie_@_${response.token}; expires=${new Date(Date.now() + 86400 * 1000)}; path=/;`
        }
      }).catch((err) => {
        const error = err;
        console.log('error', error);
      })
    },
    cookieCheck: function() {
      if (document.cookie.includes('_@_')) {
        let cookieElements = document.cookie.split('_@_');
        if (cookieElements) {
        this.currentCookie.cname = cookieElements[0] + '_@_';
        this.currentCookie.ctoken = cookieElements[1];
        securityMutators.mutateAuth({
          actionType: 'setToken',
          payload: (this.currentCookie.ctoken ? this.currentCookie.ctoken : '')
        })
        securityMutators.mutateAuth({
          actionType: 'setLoggedIn',
          payload: true
        })
        console.log('state', this.state);
        }
      }
    },
    logout: function() {
      document.cookie = `${this.currentCookie.cname + this.currentCookie.ctoken}; expires=${new Date(Date.now() - 86400 * 1000)}; path=/;`
        securityMutators.mutateAuth({
          actionType: 'setToken',
          payload: ''
        })
        securityMutators.mutateAuth({
          actionType: 'setLoggedIn',
          payload: false
        })
      console.log(document.cookie);
    }
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
