import Vue from 'vue';

export const authStore = Vue.observable({
    auth: {
        isLoggedIn: false,
        name: '',
        token: ''
    }
})