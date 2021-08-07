import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

function getHead(route) {
  if (route.params.id === 'ucom') return { selHead: store.getters.Ucom, PartName: 'Ucom' }
  else if (route.params.id === 'global-credit') return { selHead: store.getters.GlobalCredit, PartName: 'GlobalCredit' }
  else if (route.params.id === 'good-credit') return { selHead: store.getters.GoodCredit, PartName: 'GoodCredit' }
  else return { selHead: store.getters.newPartner, PartName: store.state.Partners.filter(v => v.key === route.params.id)[0].name }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      name: '404',
      path: '/404',
      alias: '*',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      beforeEnter: (to, from, next) => {
        store.state.menu = true
        store.dispatch('getNotify')
        store.dispatch('getPartners')
        next()
      },
      children: [
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/views/PersonalPage.vue')
        },
      ]
    },
    {
      path: '/lawyer',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'Lawyer',
          component: () => import('@/components/Debts/DebtsHomeModal.vue'),
        },
        {
          path: 'dataofcase',
          name: 'DataOfCase',
          component: () => import('@/components/Lawyer/DataOfCase.vue'),
        },
        {
          path: 'list-of-courts',
          name: 'ListOfCourts',
          component: () => import('@/components/Lawyer/ListOfCourts.vue'),
        },
        {
          path: 'list-of-sessions',
          name: 'ListOfSessions',
          component: () => import('@/components/Lawyer/ListOfSessions.vue'),
        },
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/Home.vue'),
      beforeEnter(to, from, next) {
        store.dispatch('getUsers')
        next()
      },
      children: [
        {
          path: '',
          name: 'AdminUsers',
          component: () => import('@/components/Admin/AdminUsers.vue'),
        },
      ]
    },
    {
      path: '/debts',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'Debts',
          component: () => import('@/components/Debts/DebtsHomeModal.vue'),
        },
        {
          path: 'partners',
          name: 'Partners',
          component: () => import('@/components/Debts/DebtsPartners.vue'),
          beforeEnter(to, from, next) {
            store.commit('clearData')
            next()
          },
        },
        {
          path: 'partners/acba',
          name: 'Acba',
          component: () => import('@/components/Debts/DebtsAcba.vue'),
          beforeEnter(to, from, next) {
            store.dispatch('getAcbaNotify')
            next()
          },
        },
        {
          path: 'partners/:id',
          name: 'Patrner',
          component: () => import('@/components/Debts/BuilderDebts/BuilderPartnerTable.vue'),
          props: getHead,
        },
        {
          path: 'subjectday',
          name: 'SubjectDay',
          component: () => import('@/components/Debts/SubjectDay/SubjectDay.vue'),
          beforeEnter: (to, from, next) => {
            store.dispatch('getSubDayData', { id: 0, column: '', ascDesc: '' })
            next()
          },
        },
        {
          path: 'list-of-courts',
          component: () => import('@/components/Lawyer/ListOfCourts.vue'),
        },
        {
          path: 'statuses',
          name: 'Statuses',
          component: () => import('@/components/Debts/DebtsStatuses.vue'),
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('besafe')
  if (token) {
    if (store.getters.ucomUser) {
      to.path !== '/debts/partners/ucom' ? next({ path: '/debts/partners/ucom' }) : next()
    } else next()
  }
  else if (to.path === '/login') next()
  else next({ name: 'Login' })
})

export default router