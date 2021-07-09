import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/axios'
import router from "@/router"
import acba from './modules/acba'
import ucom from './modules/ucom'
import global_credit from './modules/global-credit'
import good_credit from './modules/good-credit'
import statuses from './modules/statuses'
import user from './modules/user'
import admin from './modules/admin'

Vue.use(Vuex)

const userURL = 'users/'

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
    errMessig: false,
    CaseData: [
      {
        "id": 1,
        "branch": "efefewf",
        "client_num": "ewfwefewf",
        "name": "",
        checked: false
      },
      {
        "id": 2,
        "branch": "efefeewfwefwf",
        "client_num": "eewfewfwfwefewf",
        "name": "",
        checked: false
      },
      {
        "id": 3,
        "branch": "babfewfw",
        "client_num": "eewfewfwfwefewf",
        "name": "",
        checked: false
      }
    ],
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
    addChecked(state, data) {
      data.forEach(v => {
        v.checked = false
        state.CaseData.push(v)
      })
    },
    uploadCols(_, data) {
      let arr = [];
      data.newTable.forEach((v) => {
        let array = [];
        data.header.forEach((i) =>
          array.push({
            id: i.id,
            value: v[i.name],
            column: i.column,
          })
        );
        arr.push(array);
      });
      return arr;
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
    login({ state }, data) {
      axios.post('api/login', data).then(res => {
        localStorage.setItem('besafe', res.access_token)
        router.replace("/")
        state.user.userData = res.user
      })
        .catch(() => state.errMessig = true)
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
    getPartData({ commit }, data) {
      axios.get('api/partners/' + data.name + '?page=' + data.id)
        .then(res => commit.addChecked(res))
        .catch(err => console.log(err))
    },
    getPartners({ state }) {
      axios.get('api/partners')
        .then(res => state.Partners = res)
        .catch(err => console.log(err))
    },
    uploadTable({ commit }, data) {
      let changeTable = { newTable: data.newTable, header: data.header }
      axios.post('api/partners/upload-table/' + data.id, commit.uploadCols(changeTable))
        .then(res => state.CaseData = res)
        .catch(err => console.log(err))
    },
    setNewValue(_, data) {
      axios.post('api/set-new-value/' + data.id + '?id=' + data.id, data)
        .then(res => console.log(err))
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