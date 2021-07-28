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
    user: JSON.parse(localStorage.getItem('besafe_us')) || "",
    CaseData: [],
    SubDayCase: [],
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
    HistoryList: [],
    Partners: [],
    ClientsData: [
      {
        id: 1,
        checked: false,
        info: "",
        name: "Մուսաելյան Արսեն Ալյոշայի",
        phone: "055 32 64 85",
        email: "Arsen877@gmail.com",
        birthday: "18.06.92",
        date: "11.06.21",
      },
    ],
    CourtsList: [
      { id: 1, region: "Երևան", court: "Երևան քաղաքի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք․ Երևան, Տիգրան Մեծի 23/1" },
      { id: 2, region: "Կոտայք", court: "ՀՀ Կոտայքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Հրազդան, Միկրոշրջան թաղամաս, 13-րդ փող., 1/1" },
      { id: 3, region: "Վայոց Ձոր", court: "ՀՀ Արարատի և Վայոց ձորի մարզերի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Արտաշատ, Շահումյան 19" },
      { id: 4, region: "Արմավիր", court: "ՀՀ Արմավիրի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Արմավիր, Հանրապետության 41" },
      { id: 5, region: "Արագածոտն", court: "ՀՀ Արագածոտնի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Աշտարակ, Էջմիածնի խճուղի 65" },
      { id: 6, region: "Տավուշ", court: "ՀՀ Տավուշի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Իջևան, Նալբանդյան 1/1" },
      { id: 7, region: "Գեղարքունիք", court: "ՀՀ Գեղարքունիքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Գավառ, Սայադյան 18" },
      { id: 8, region: "Լոռի", court: "ՀՀ Լոռու մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Վանաձոր, Մխիթար Գոշի 6" },
      { id: 9, region: "Սյունիք", court: "Սյունիքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Կապան, Մելիք Ստեփանյան 3/2" },
      { id: 10, region: "Շիրակ", court: "ՀՀ Շիրակի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Գյումրի, Անկախության հրապարակ 7" },
      { id: 11, region: "Արարատ", court: "ՀՀ Արարատի և Վայոց ձորի մարզերի առաջին ատյանի ընդհանուր իրավասության դատարան", address: "ք. Արտաշատ, Շահումյան 19" },
      { id: 12, region: "ԼՂՀ", court: "Արցախի Հանրապետության ընդհանուր իրավասության առաջին ատյանի դատարան", address: "ք.Ստեփանակերտ, Ազատամարտիկների 42" },
    ]
  },
  mutations: {
    formData(_, files) {
      let formData = new FormData();
      files.forEach((v, i) => formData.append("files[" + i + "]", v))
      return formData;
    },
    onexport(_, data) {
      let column = data.header.map((v) => v.name);
      let animalWS = xlsx.utils.aoa_to_sheet([column, ...data.exportTable]);
      let wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, animalWS, "nameUsers");
      xlsx.writeFile(wb, "besafe.xlsx");
    },

    setUserData: state => state.user = JSON.parse(localStorage.getItem('besafe_us')),

    clearData: state => state.CaseData = [],

    clearSubDayData: state => state.SubDayCase = [],

    updateState: (state, value) => state.CaseData = value
  },
  actions: {

    deletePartRows({ commit, dispatch }, ids) {
      axios.post('partners/delete-rows', { ids })
        .then(() => {
          commit('clearData')
          dispatch('getPartData', { name: 'acba', id: 1, column: '', ascDesc: '' })
        })
        .catch(err => console.log(err))
    },

    deleteSubjDayRows({ commit, dispatch }, ids) {
      axios.post('partners/delete-rows', { ids })
        .then(() => {
          commit('clearSubDayData')
          dispatch('getSubDayData', { id: 1, column: '', ascDesc: '' })
        })
        .catch(err => console.log(err))
    },

    uploadCols(_, data) {
      let today = new Date();
      let date = today.getFullYear() + "." + today.getMonth() + "." + today.getDate()
      return data.newTable.map((v) => {
        let array = [];
        v.forEach(x => {
          data.header.forEach((i) => {
            if (x.column.trim().toLowerCase() === i.name.toLowerCase()) array.push({ value: x.value, column: i.column })
          });
        })
        array.push({ value: date, column: "date_of_entry" })
        return array
      });
    },

    uploadTable({ state, dispatch, commit }, value) {
      dispatch('uploadCols', { newTable: value.newTable, header: value.header }).then(res => {
        axios.post('partners/upload-table/' + value.id, { data: res })
          .then(() => {
            commit('clearData')
            dispatch('getPartData', { name: value.id, id: 1, column: '', ascDesc: '' })
          }).catch(err => console.log(err))
      })
    },

    sort({ state, commit }, url) {
      axios.get('partners/' + url.params + '?sort=' + url.column + '&ascDesc=' + url.ascDesc)
        .then(res => {
          commit('clearData')
          state.CaseData = [...res.data]
        }).catch(err => console.log(err))
    },
    searchTable({ state, commit }, data) {
      axios.get("partners/" + data.page + "?" + data.column + "=" + data.text)
        .then((res) => {
          commit('clearData')
          commit('updateState', res.data)
        }).catch(err => console.log(err))
    },
    uploadFile({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = commit('formData', data.files);
      axios.post(`customers/${data.id}/upload`, { id: data.id, files: dataFiles }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    sendEmail({ commit }, data) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let dataFiles = data.files && commit('formData', data.files);
      axios.post('customers/sendEmail', { ...data, ...(dataFiles && { files: dataFiles }) }, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    login({ state, getters }, data) {
      axios.post('login', data).then(res => {
        state.user = res.user
        localStorage.setItem('besafe', res.access_token)
        localStorage.setItem('besafe_us', JSON.stringify(res.user))
        if (getters.ucomUser) {
          router.replace('/debts/partners/ucom')
        } else router.replace('/')
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
    getPartData({ state }, value) {
      axios.get('partners/' + value.name + '?page=' + value.id + '&sort=' + value.column + '&ascDesc=' + value.ascDesc)
        .then(res => state.CaseData = [...state.CaseData, ...res.data])
        .catch(err => console.log(err))
    },
    getPartners({ state }) {
      axios.get('partners')
        .then(res => state.Partners = res.partners)
        .catch(err => console.log(err))
    },

    uploadSubjecDay({ dispatch }, data) {
      dispatch('uploadCols', {
        newTable: data.newTable, header: data.header
      }).then((res) => {
        axios.post('day-subjects', { data: res })
          .then(() => dispatch('getSubDayData', 0))
          .catch(err => console.log(err))
      })
    },
    setNewValue(_, data) {
      axios.put('set-value/' + data.params + '?id=' + data.id + '&column=' + data.column + '&value=' + data.newValue + "&old_value=" + data.oldValue)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    changePass(_, data) {
      axios.post('change-pass', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    exportWord(_, url) {
      axios.get("word-download/" + url, { responseType: 'blob' }).then(res => {
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
    getSubDayData({ state }, value) {
      axios.get('day-subjects?page=' + value.id + '&sort=' + value.column + '&ascDesc=' + value.ascDesc)
        .then(res => state.SubDayCase = [...state.SubDayCase, ...res.data])
        .catch(err => console.log(err))
    },
  },
  getters: {
    newPartner: state => [...state.newPartnerHead, ...state.acba.Acba],
    Partners: state => state.Partners,
    menu: state => state.menu,
    CaseData: state => state.CaseData,
    ClientsData: state => state.ClientsData,
    SubDayCase: state => state.SubDayCase,
    Prioritys: state => state.Prioritys,
    HistoryList: state => state.HistoryList,
    CourtsList: state => state.CourtsList,
    user: state => state.user,
    ucomUser: state => state.user ? state.user.partners.length === 1 && state.user.partners[0].key === "ucom" : false
  }
})