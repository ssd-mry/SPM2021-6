import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from "./components/login";
import login_user from './components/login_user'
import login_Administrator from './components/login_Administrator'
import userRegister from "./components/userRegister";
import map from "./components/map";
import showTable from "./components/showTable";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      children: [
        {
          path: '',
          component: login_user
        },
        {
          path: 'login_Administrator',
          component: login_Administrator
        },
      ]
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: userRegister
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/showTable',
      name: 'showTable',
      component: showTable
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
