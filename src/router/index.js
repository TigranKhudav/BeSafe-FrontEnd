import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

function getHead(route) {
  if (route.params.id !== "acba") {
    if (route.params.id === 'ucom') return { selHead: store.getters.Ucom, PartName: 'Ucom' }
    else if (route.params.id === 'global-credit') return { selHead: store.getters.GlobalCredit, PartName: 'GlobalCredit' }
    else if (route.params.id === 'good-credit') return { selHead: store.getters.GoodCredit, PartName: 'GoodCredit' }
    else return { selHead: store.getters.newPartner, PartName: store.state.Partners.filter(v => v.key === route.params.id)[0].name }
  }
}

let param

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
      beforeEnter: (to, from, next) => {
        store.state.menu = true
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
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getUsers')
        next()
      },
      children: [
        {
          path: '',
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
          beforeEnter: async (to, from, next) => {
            await store.dispatch('getPartners')
            next()
          },
        },
        {
          path: 'partners/:id',
          name: 'Patrner',
          props: getHead,
          beforeEnter: async (to, from, next) => {
            param = to.params.id
            await store.dispatch('getPartData', { name: to.params.id, id: 0 })
            next()
          },
          component: async () => {
            if (param === 'acba') {
              return import('@/components/Debts/DebtsAcba.vue')
            } else return import('@/components/Debts/BuilderDebts/BuilderPartnerTable.vue')
          },
        },
        {
          path: 'subjectday',
          name: 'SubjectDay',
          component: () => import('@/components/Debts/SubjectDay/SubjectDay.vue'),
          beforeEnter: async (to, from, next) => {
            await store.dispatch('getSubjectDay')
            next()
          },
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
          path: 'list-of-courts',
          component: () => import('@/components/Lawyer/ListOfCourts.vue'),
        },
        {
          path: 'statuses',
          name: 'Statuses',
          component: () => import('@/components/Debts/DebtsStatuses.vue'),
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
  if (token) next()
  else if (to.path === '/login') next()
  else next({ name: "Login" })
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
})

export default router