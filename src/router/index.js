import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('@/views/Home.vue')
  // },
  {
    path: '/',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/debts',
    name: 'Debts',
    component: () => import('@/views/Debts.vue'),
    children: [
      {
        path: '',
        name: 'DebtsHome',
        component: () => import('@/components/Debts/DebtsHomeModal.vue')
      },
      {
        path: 'partners',
        name: 'Partners',
        component: () => import('@/components/Debts/DebtsPartners.vue')
      },
      {
        path: 'partners/1',
        name: 'Acba',
        component: () => import('@/components/Debts/DebtsAcba.vue')
      },
      {
        path: 'partners/2',
        name: 'Ucom',
        component: () => import('@/components/Debts/DebtsUcom.vue')
      },
      {
        path: 'partners/3',
        name: 'GoodCredit',
        component: () => import('@/components/Debts/DebtsGoodCredit.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
