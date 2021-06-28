import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from '@/utils/axios'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/lawyer',
      name: 'Lawyer',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'ClientsData',
          component: () => import('@/components/Lawyer/ClientsData.vue')
        },
        {
          path: 'dataofcase',
          name: 'DataOfCase',
          component: () => import('@/components/Lawyer/DataOfCase.vue')
        },
        // {
        //   path: 'partners/1',
        //   name: 'Acba',
        //   component: () => import('@/components/Debts/DebtsAcba.vue')
        // },
        // {
        //   path: 'partners/2',
        //   name: 'Ucom',
        //   component: () => import('@/components/Debts/DebtsUcom.vue')
        // },
        // {
        //   path: 'partners/3',
        //   name: 'GlobalCredit',
        //   component: () => import('@/components/Debts/DebtsGlobalCredit.vue')
        // },
        // {
        //   path: 'partners/4',
        //   name: 'GoodCredit',
        //   component: () => import('@/components/Debts/DebtsGoodCredit.vue')
        // },
        // {
        //   path: 'reports',
        //   name: 'Reports',
        //   component: () => import('@/components/Debts/Reports/Reports.vue')
        // },
        // {
        //   path: 'subjectday',
        //   name: 'SubjectDay',
        //   component: () => import('@/components/Debts/SubjectDay/SubjectDay.vue')
        // },
        // {
        //   path: 'archive',
        //   name: 'Archive',
        //   component: () => import('@/components/Debts/SubjectDay/Archive.vue')
        // },
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/Home.vue'),
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
      component: () => import('@/views/Home.vue'),
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
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('besafe')
//   if (token) {
//     axios.post('auth').then(result => {
//       store.commit("userData", result)
//       next()
//     }).catch(() => next({ name: "Login" }))
//   }
//   else if (to.path === '/login') next()
//   else next({ name: "Login" })
// })

export default router