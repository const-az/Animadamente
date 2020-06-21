import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    component: Home
  },
  {
    path: '/acerca',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/agregarproductos',
    name: 'AddProducts',
    component: () => import(/* webpackChunkName: "addproducts" */ '../views/AddProducts.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);

  if(!user && authRequired){
    next('/home')
  } else{
    next();
  }
})

export default router
