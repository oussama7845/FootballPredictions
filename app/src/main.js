import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authMiddleware } from './middleware/AuthSecurity';
import eventBus from 'vue3-eventbus'

const routes = [
    {
        path: '/',
        component: () => import('./pages/Home.vue'),
        beforeEnter: authMiddleware, 
    },
    {
        path: '/signin',
        component: () => import('./pages/connexion/signin.vue'),
    },
    {
        path: '/signup',
        component: () => import('./pages/connexion/signup.vue'),
    },
    {
        path: '/userHome',
        component: () => import('./pages/userHome.vue'),
        beforeEnter: authMiddleware, 
    },
    {
        path: '/Myprediction',
        component: () => import('./pages/mypredictions.vue'),

    }

    
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.use(eventBus)
app.mount('#app');