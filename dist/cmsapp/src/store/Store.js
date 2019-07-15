import Vue from 'vue';

export const securityStore = Vue.observable({
    auth: {
        isLoggedIn: false,
        name: 'authorization',
        token: '',
        archetypes: {}
    }
})

export const securityMutators = {
    mutateAuth( action = { actionType: '', payload: '' } ) {
        switch (action.actionType) {
            case 'setLoggedIn': 
                securityStore.auth.isLoggedIn = action.payload;
            break;
            case 'setToken':
                securityStore.auth.token = action.payload;
            break;
            case 'setArchetypes': 
                securityStore.auth.archetypes = action.payload;
            break;
        }
    }
}