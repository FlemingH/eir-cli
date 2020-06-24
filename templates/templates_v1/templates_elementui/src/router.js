import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import eir_manager from './components/eir_manager.vue'
import eir_manager_login from './components/eir_manager_login.vue'
import eir_root from './components/eir_root.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: eir_root,
        },
        {
            path: "/emlogin",
            component: eir_manager_login,
        },
        {
            path: "/em",
            name: "em",
            component: eir_manager,
        },
    ]
});