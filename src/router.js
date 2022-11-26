import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/index.html',
      name: 'home',
      alias: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('./views/Reset.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('./views/Success.vue')
    },
    {
      path: '/paypal',
      name: 'paypal',
      component: () => import('./views/Paypal.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        requiresAuth: true
      }
    },
    //admin routes
    {
      path: '/admin/dashboard',
      name: 'adminDashboard',
      component: () => import('./views/Admin/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/cashins',
      name: 'adminCashins',
      component: () => import('./views/Admin/Cashins.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/cashouts',
      name: 'adminCashouts',
      component: () => import('./views/Admin/Cashouts.vue'),
      meta: {
        requiresAuth: true
      }
    },
    // agent routes
    {
      path: '/agent/signup',
      name: 'agentSignup',
      component: () => import('./views/Agent/Signup.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/agent/activate',
      name: 'agentActivate',
      component: () => import('./views/Agent/Activate.vue')
    },
    {
      path: '/agent/login',
      name: 'agentLogin',
      component: () => import('./views/Agent/Login.vue')
    },
    {
      path: '/agent/dashboard',
      name: 'agentDashboard',
      component: () => import('./views/Agent/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/agent/finance',
      name: 'agentFinance',
      component: () => import('./views/Agent/Finance.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/agent/cashout',
      name: 'agentCashout',
      component: () => import('./views/Agent/Cashout.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/agent/referrals',
      name: 'agentReferrals',
      component: () => import('./views/Agent/Referrals.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/agent/settings',
      name: 'agentSettings',
      component: () => import('./views/Agent/Settings.vue'),
      meta: {
        requiresAuth: true
      }
    },
    //admin routes
    {
      path: '/employee/dashboard',
      name: 'employeeDashboard',
      component: () => import('./views/Employee/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/')
  else next()
})

export default router

