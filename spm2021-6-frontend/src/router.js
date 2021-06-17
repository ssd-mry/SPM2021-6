import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import login from "./components/login";
import login_user from './components/login_user'
import login_Administrator from './components/login_Administrator'
import userRegister from "./components/userRegister";
import showTableMenu from "./components/showTableMenu";
import basicshock from "./components/basicshock";
import housedestory from "./components/housedestory";
import lifeline from "./components/lifeline";
import peopleinjured from "./components/peopleinjured";
import prediction from "./components/prediction";
import secondarydisaster from "./components/secondarydisaster";
import map from "./components/map";
import exportData from "./components/exportData";

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
      path: '/showTableMenu',
      name: 'showTableMenu',
      component: showTableMenu,
      redirect:'/showTableMenu/basicshock',
      children: [
        {
          path: 'basicshock',
          name: 'basicshock',
          component: basicshock
        },
        {
          path: 'housedestory',
          name: 'housedestory',
          component: housedestory
        },
        {
          path: 'lifeline',
          name: 'lifeline',
          component: lifeline
        },
        {
          path: 'peopleinjured',
          name: 'peopleinjured',
          component: peopleinjured
        },
        {
          path: 'prediction',
          name: 'prediction',
          component: prediction
        },
        {
          path: 'secondarydisaster',
          name: 'secondarydisaster',
          component: secondarydisaster
        },
        {
          path: 'map',
          name: 'map',
          component: map
        },
        {
          path: 'exportData',
          name: 'exportData',
          component: exportData
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
