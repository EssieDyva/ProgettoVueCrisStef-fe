import { createWebHistory, createRouter } from 'vue-router'

import { Home, Fermate } from '../views'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/fermate', component: Fermate },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})