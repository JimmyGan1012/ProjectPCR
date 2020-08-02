import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import self from "../components/self"
import guild from "../components/guild"
import test from "../components/test"
import add from "../components/add"
import homepage from "../components/homepage"
import currentInfo from "../components/currentInfo"
import selfBox from "../components/selfBox"
import timeLine from "../components/timeLine"
import timeLineInsert from "../components/timeLineInsert"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:"/self",
      name:'self',
      component: self
    },
    {
      path:"/guild",
      name:'guild',
      component: guild      
    },
    {
      path:'/test',
      name:'test',
      component:test
    },
    {
      path:'/add',
      name:'add',
      component:add
    },
    {
      path:'/',
      name:'homepage',
      component:homepage
    },
    {
      path:'/currentInfo',
      name:"currentInfo",
      component:currentInfo
    },
    {
      path:'/selfBox',
      name:"selfBox",
      component:selfBox
    },
    {
      path:'/timeLine',
      name:"timeLine",
      component:timeLine
    },
    {
      path:'/timeLineInsert',
      name:"timeLineInsert",
      component:timeLineInsert
    }
  ]
})
