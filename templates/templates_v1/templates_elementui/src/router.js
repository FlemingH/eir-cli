import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import eir_manager from './eir_core/components/eir_manager.vue'
import eir_manager_login from './eir_core/components/eir_manager_login.vue'
import eir_root from './eir_core/components/eir_root.vue'

import web_router from './web/web_router'

const baseRoutes = [
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
];

const routes = baseRoutes.concat(web_router);

export default new VueRouter({
    routes,
});