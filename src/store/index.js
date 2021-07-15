import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/axios'
import router from "@/router"
import acba from './modules/acba'
import ucom from './modules/ucom'
import global_credit from './modules/global-credit'
import good_credit from './modules/good-credit'
import statuses from './modules/statuses'
import admin from './modules/admin'
import xlsx from "xlsx";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acba,
    ucom,
    global_credit,
    good_credit,
    statuses,
    admin
  },
  state: {
    menu: false,
    errMessig: false,
    user: JSON.parse(localStorage.getItem('besafe_us')),
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
    Prioritys: [
      {
        id: 1,
        name: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      {
        id: 2,
        name: "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      { id: 3, name: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
      {
        id: 4,
        name: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      {
        id: 5,
        name: "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      { id: 6, name: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
      {
        id: 7,
        name: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      {
        id: 8,
        name: "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
      },
      { id: 9, name: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
    ],
    HistoryList: [
      {
        id: 1,
        name: "gurgenstepanyan",
        change: "Անձնագիր    AU8562  >   AU8562",
        date: "02.06.21",
        hour: "12.:30",
      },
    ],
    Partners: [],
  },
  mutations: {
    formData(_, files) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files[" + i + "]", files[i]);
      }
      return formData;
    },
    onexport(_, data) {
      let column = data.header.map((v) => v.name);
      let animalWS = xlsx.utils.aoa_to_sheet([column, ...data.exportTable]);
      let wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, animalWS, "nameUsers");
      xlsx.writeFile(wb, "besafe.xlsx");
    },
    setUserData: state => {
      state.user = JSON.parse(localStorage.getItem('besafe_us'))
    }
  },
  actions: {
    uploadFile({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit('formData', data.files);
      axios.post(`customers/${data.id}/upload`, { id: data.id, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    sendEmail({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit('formData', data.files);
      axios.post('users/sendEmail', { ...data, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    login({ state }, data) {
      axios.post('login', data).then(res => {
        state.user = res.user
        localStorage.setItem('besafe', res.access_token)
        localStorage.setItem('besafe_us', JSON.stringify(res.user))
        router.replace({ name: 'Home' })
      }).catch(() => state.errMessig = true)
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
    getPartData({ state }, value) {
      axios.get('partners/' + value.name + '?page=' + value.id)
        .then(res => state.CaseData = [...state.CaseData, ...res.data])
        .catch(err => console.log(err))
    },
    getPartners({ state }) {
      axios.get('partners')
        .then(res => state.Partners = res.partners)
        .catch(err => console.log(err))
    },
    uploadCols(_, data) {
      let arr = [];
      data.newTable.forEach((v) => {
        let array = [];
        data.header.forEach((i) => {
          if (v[i.name]) {
            array.push({
              id: i.id,
              value: v[i.name],
              column: i.column,
            })
          }
        });
        arr.push(array);
      });
      return arr;
    },
    uploadSubjecDay({ dispatch, state }, data) {
      dispatch('uploadCols', { newTable: data.newTable, header: data.header }).then((res) => {
        console.log("hi");
        axios.post('day-subjects', { data: res })
          .then(res => state.CaseData = res.data)
          .catch(err => console.log(err))
      })
    },
    uploadTable({ state, dispatch }, value) {
      dispatch('uploadCols', { newTable: value.newTable, header: value.header }).then(res => {
        axios.post('partners/upload-table/' + value.id, { data: res })
          .then(res => {
            state.CaseData = [...state.CaseData, ...res.data]
          })
          .catch(err => console.log(err))
      })
    },
    setNewValue(_, data) {
      axios.put('api/set-value/' + data.params + '?id=' + data.id + '&column=' + data.column + '&value=' + data.newValue)
        .then(res => console.log(err))
        .catch(err => console.log(err))
    },
    changePass(_, data) {
      axios.post('change-pass', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    exportAcbaWord(_, url) {
      axios.get(url, { responseType: 'blob' }).then(res => {
        let blob = new Blob([res]);
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, "besafe.docx");
        }
        else {
          let blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
          let tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = blobURL;
          tempLink.setAttribute('download', "besafe.docx");
          if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
          }
          document.body.appendChild(tempLink);
          tempLink.click();
          setTimeout(() => {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
          }, 200)
        }
      }).catch(err => console.log(err))
    },
    getSubjectDay({ state }) {
      axios.get('day-subjects')
        .then(res => state.CaseData = res.data)
        .catch(err => console.log(err))
    },
  },
  getters: {
    newPartner: state => [...state.newPartnerHead, ...state.acba.Acba],
    Partners: state => state.Partners,
    menu: state => state.menu,
    CaseData: state => state.CaseData,
    Prioritys: state => state.Prioritys,
    HistoryList: state => state.HistoryList,
    user: state => state.user
  }
})