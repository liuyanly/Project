import Vue from 'vue'
import Router from 'vue-router'

import keyauth from './keyauth';
import gateway from './gateway';
import valuka from './valuka';
import dispatch from './dispatch';
import visualization from './visualization';
import datamonitor from './datamonitor';
import errorPage from './errorPage';

Vue.use(Router);


const login = {
    path: '/login',
    component: resolve => require(['../pages/login.vue'], resolve)
};

const authorize = {
    path: '/authorize',
    component: resolve => require(['../pages/authorize.vue'], resolve)
};

const main = {
    path: '/main',
    component: resolve => require(['../pages/Main.vue'], resolve),
    meta: { type: "identity", activeName: '/domains' },
    children: [
        //消息中心
        {
            path: '/messageBox',
            component: resolve => require(['../pages/messageBox/messageBox.vue'], resolve),
            meta: { type: "", activeName: '' }
        },
        ...keyauth,
        ...gateway,
        ...valuka,
        ...dispatch,
        ...visualization,
        ...datamonitor
    ]
};

export default new Router({
  routes: [
  	{
        path: '/',
        redirect: '/login'
    },
    login,
    main,
    authorize,
    ...errorPage
  ]
})
