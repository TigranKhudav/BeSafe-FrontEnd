import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Debts.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/components/Admin/AdminHome.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/components/Admin/AdminUsers.vue')
      },
    ]
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
        name: 'GlobalCredit',
        component: () => import('@/components/Debts/DebtsGlobalCredit.vue')
      },
      {
        path: 'partners/4',
        name: 'GoodCredit',
        component: () => import('@/components/Debts/DebtsGoodCredit.vue')
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('@/components/Debts/Reports/Reports.vue')
      },
      {
        path: 'subjectday',
        name: 'SubjectDay',
        component: () => import('@/components/Debts/SubjectDay/SubjectDay.vue')
      },
      {
        path: 'archive',
        name: 'Archive',
        component: () => import('@/components/Debts/SubjectDay/Archive.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
