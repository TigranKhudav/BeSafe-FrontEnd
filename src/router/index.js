import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from '@/utils/axios'

Vue.use(VueRouter)

function getHead(route) {
  if (route.params.id === 'ucom') return { selHead: store.getters.Ucom, PartName: 'Ucom' }
  else if (route.params.id === 'acba') return { selHead: store.getters.Acba }
  else if (route.params.id === 'global-credit') return { selHead: store.getters.GlobalCredit, PartName: 'GlobalCredit' }
  else if (route.params.id === 'good-credit') return { selHead: store.getters.GoodCredit, PartName: 'GoodCredit' }
  else return { selHead: store.getters.NewPartner, PartName: store.state.Partners.filter(v => v.key === route.params.id)[0].name }
}

let param

function getComp() {
  if (param === 'acba') {
    return import('@/components/Debts/DebtsAcba.vue')
  } else return import('@/components/Debts/BuilderDebts/BuilderPartnerTable.vue')
}


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
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
          path: 'clientsdata',
          name: 'ClientsData',
          component: () => import('@/components/Lawyer/ClientsData.vue'),
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
      children: [
        {
          path: '',
          name: 'Admin',
          component: () => import('@/components/Admin/AdminHome.vue'),
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/components/Admin/AdminUsers.vue'),
        },
        {
          path: 'subject-to-approval',
          name: 'SubjectToApproval',
          component: () => import('@/components/Admin/SubjectToApproval.vue'),
        }
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
        },
        {
          path: 'partners/:id',
          name: 'Patrner',
          component: getComp,
          props: getHead,
          beforeEnter: async (to, from, next) => {
            param = to.params.id
            store.state.menu = false;
            await store.dispatch('getPartData', { name: to.params.id, id: 0 })
            next()
          },
        },
        {
          path: 'subjectday',
          name: 'SubjectDay',
          component: () => import('@/components/Debts/SubjectDay/SubjectDay.vue'),
        },
        {
          path: 'archive',
          name: 'Archive',
          component: () => import('@/components/Debts/SubjectDay/Archive.vue'),
        },
        {
          path: 'archive/:date',
          name: 'Archiv',
          component: () => import('@/components/Debts/SubjectDay/ArchiveDay.vue'),
          props: { selHead: store.getters.Acba }
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/components/Debts/Reports/Reports.vue'),
        },
        {
          path: 'statuses',
          name: 'Statuses',
          component: () => import('@/components/Debts/DebtsStatuses.vue'),
        },
        {
          path: 'listofcourts',
          name: 'ListOfCourts',
          component: () => import('@/components/Lawyer/ListOfCourts.vue'),
        },
        {
          path: 'templates',
          name: 'Templates',
          component: () => import('@/components/Debts/DebtsTemplates.vue'),
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('besafe')
  if (token) {
    next()
    // axios.post('auth').then(result => {
    //   store.commit("userData", result)
    //   next()
    // }).catch(() => next({ name: "Login" }))
  }
  else if (to.path === '/login') next()
  else next({ name: "Login" })
})
// router.beforeEach((to, from, next) => {
//   const role = 'debts'
//   const auth = to.meta.authorize
//   if (auth) {
//     if (role === auth) {
//       next()
//     } else next({ name: '404' });
//   } else next()
// })

export default router