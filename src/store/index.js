import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/axios'
import acba from './modules/acba'
import ucom from './modules/ucom'
import global_credit from './modules/global-credit'
import good_credit from './modules/good-credit'
import statuses from './modules/statuses'
import user from './modules/user'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acba,
    ucom,
    global_credit,
    good_credit,
    statuses,
    user,
    admin
  },
  state: {
    menu: true,
    showRepaymentSchedule: false,
    CaseData: [],
    newPartnerHead: [
      {
        id: 1,
        checked: true,
        name: "Անձնագիր",
        column: 'passport'
      },
      {
        id: 1,
        checked: true,
        name: "ՈՒմ կողմից է տրված",
        column: 'passport_authority'
      },
      {
        id: 1,
        checked: true,
        name: "Երբ է տրված",
        column: 'date_of_issue'
      },
      {
        id: 1,
        checked: true,
        name: "Սոց քարտ",
        column: 'social_card'
      },
    ],
    // back
    Partners: [
      { id: 1, name: "Acba", key: 'acba' },
      { id: 2, name: "UCOM", key: 'ucom' },
      { id: 3, name: "Global Credit", key: 'global-credit' },
      { id: 4, name: "Good Credit", key: 'good-credit' },
    ],
  },
  mutations: {
    showRepaymentSchedule(state, value) {
      state.showRepaymentSchedule = value
    },
    userData(state, data) {
      state.UserData = data
    },
    formData(files) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files[" + i + "]", files[i]);
      }
      return formData;
    },
  },
  actions: {
    uploadFile({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit.formData(data.files);
      axios.post(`customers/${data.id}/upload`, { id: data.id, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    sendEmail({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit.formData(data.files);
      axios.post('users/sendEmail', { ...data, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    createUser(_, data) {
      axios.post('users/createUser', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    editUser(_, data) {
      axios.put('users/editUser', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    login(_, data) {
      axios.post('api/login', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    createPartner({ state }, data) {
      axios.post('createPartner', data)
        .then(res => {
          state.Partners = res.data.Partners
          this.$router.push(data.key);
        })
        .catch(err => console.log(err))
    },
    toArchive(_, data) {
      axios.post('archiv', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    getPartData({ state }, data) {
      axios.get('api/partners/' + data.name + '/' + data.id)
        .then(res => state.CaseData.push(...res))
        .catch(err => console.log(err))
    },
    getPartners({ state }) {
      axios.get('api/partners')
        .then(res => state.Partners = res)
        .catch(err => console.log(err))
    },
    uploadTable(_, data) {
      axios.post('api/upload-table/' + data.id, data.table)
        .then(res => state.Partners = res)
        .catch(err => console.log(err))
    },
    onexport() {
      let column = this.header.map((v) => v.name);
      const data = this.header.map((v) => [v.id, v.name, v.checked]);

      let animalWS = XLSX.utils.aoa_to_sheet([column, ...data]);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, animalWS, "nameUsers");

      XLSX.writeFile(wb, "book.xlsx");
    },
  },
  getters: {
    NewPartner: state => [...state.Acba, ...state.newPartnerHead],
    Partners: state => state.Partners,
    menu: state => state.menu,
    CaseData: state => state.CaseData
  }
})