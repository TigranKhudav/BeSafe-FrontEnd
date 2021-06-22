import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentNumber: 0,
    showHistory: false,
    showSendEmail: false,
    showInfo: false,
    showFile: false,
    showAddCase: false,
    showAddSession: false,
    // showUpcoming: true,
  },
  mutations: {
    setComponent(state, id) {
      state.componentNumber = id
    },
    historyModal(state, value) {
      state.showHistory = value
    },
    sendEmailModal(state, value) {
      state.showSendEmail = value
    },
    getInfoModal(state, value) {
      state.showInfo = value
    },
    fileModal(state, value) {
      state.showFile = value
    },
    addCaseModal(state, value) {
      state.showAddCase = value
    },
    addSessionModal(state, value) {
      state.showAddSession = value
    },
    // upcoming(state, value) {
    //   state.showUpcoming = value
    // },
  },
  actions: {
  },
  modules: {
  }
})
