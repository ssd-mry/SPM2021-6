import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from "./components/login";
import login_user from './components/login_user'
import login_Administrator from './components/login_Administrator'
import userRegister from "./components/userRegister";

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
