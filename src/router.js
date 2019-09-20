import Vue from 'vue'
import {routes} from './router'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import My from './views/My/My.vue'
import LeaderBoard from './views/LeaderBoard/LeaderBoard.vue'
import PlaylistDetail from './views/PlaylistDetail/PlaylistDetail.vue';
import PlayControl from "./views/PlayControl/PlayControl.vue";
import Login from "./views/Login/Login.vue";
import store from './store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        showNav:true
      }
    },
    {
      path:'/my',
      component:My,
      name:'My',
      meta: {
        showNav: true,
        needLogin:true
      }
    },
    {
      path:'/leader-board',
      name:'LeaderBoard',
      component: LeaderBoard
    },
    {
      path:'/play-list-detail',
      name:'PlaylistDetail',
      component: PlaylistDetail,
     
    },
    {
      path:'/playcontrol',
      name:'PlayControl',
      component: PlayControl
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})
router.beforeEach((to,from,next) =>{
  if(to.meta.needLogin && !store.state.loginStatus){
    router.push('/login')
  }else{
    next()
  }
})

export default router