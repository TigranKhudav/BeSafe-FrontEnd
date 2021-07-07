<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <h3 class="fs-11 text-gray-500">Acba</h3>
    </div>
    <common-update
      @table="uploadTable"
      v-if="admin"
      class="right-33 position-absolute top-22"
    >
      <div class="bg-42 w-10 h-10 bg-no-repeat bg-contain"></div>
      <span class="text-pink-350 ms-6">Ներմուծել հաճախորդ</span>
    </common-update>

    <common-show
      @click.native="dropdown = !dropdown"
      :dropdown="dropdown"
    ></common-show>
    <!-- Modals -->
    <transition name="fade">
      <builder-debts-select-head
        v-if="dropdown"
        :selHead="selHead"
        @renderHead="renderHead"
      ></builder-debts-select-head>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        :chagesList="HistoryList"
        v-if="$store.state.showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
    </transition>

    <transition name="fade">
      <builder-acba-modal
        :modal="'showRepaymentSchedule'"
        v-if="$store.state.showRepaymentSchedule"
      ></builder-acba-modal>
    </transition>

    <transition name="fade">
      <builder-file
        v-if="$store.state.showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div class="w-full overflow-x-auto">
          <div class="part-grid mb-8" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @check="checkAll($event)"></common-checkbox>
            </div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <common-clients-data-head
              v-for="item in (header = defaultHead)"
              :key="item.id"
              >{{ item.name }}</common-clients-data-head
            >
          </div>
          <div>
            <common-acba-list
              v-for="item in CaseData"
              :key="item.id"
              :uploadData="updateData"
              :data="item"
              :head="header"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
              @onCheck="onCheck"
              @contextmenu.prevent.native="$refs.menu.open"
              :style="cssVar"
            ></common-acba-list>
            <vue-context
              ref="menu"
              class="position-absolute w-full max-w-35 ps-0 outline-none d-flex"
            >
              <div class="ctx-grid max-w-29">
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 border-bottom"
                  role="button"
                >
                  <span class="text-white fs-9">Հայցադիմում</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 part"
                  role="button"
                  @mouseover="showMenu = true"
                >
                  <span class="text-white fs-9">Պարտավորագիր</span>
                </li>
                <li class="ls-none"></li>
              </div>
              <div class="ctx-grid" v-if="showMenu">
                <li class="ls-none"></li>
                <li
                  class="ls-none py-7 ps-10 shadow-1 border-bottom subMenu"
                  role="button"
                >
                  <span class="text-gray-500 fs-8">Մեկանգամյա մարման</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 shadow-1 subMenu"
                  role="button"
                  @click="$store.state.showRepaymentSchedule = true"
                >
                  <span class="text-gray-500 fs-8">Գրաֆիկով մարման</span>
                </li>
              </div>
            </vue-context>
          </div>
        </div>
        <div class="my-auto">
          <common-button
            ><div class="bg-19 w-12 h-12 bg-contain bg-no-repeat"></div
          ></common-button>
          <common-button @click="onexport"
            ><div class="bg-20 w-12 h-12 bg-contain bg-no-repeat"></div
          ></common-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueContext from "vue-context";
import CommonButton from "@/common/CommonButton.vue";
import CommonCheckbox from "@/common/CommonCheckbox.vue";
import CommonClientsDataHead from "@/common/CommonClientsDataHead.vue";
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
import BuilderFile from "../Builder/BuilderFile.vue";
import CommonAcbaList from "./CommonDebts/CommonAcbaList.vue";
import BuilderAcbaModal from "./BuilderDebts/BuilderAcbaModal.vue";
import CommonShow from "./CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebts/BuilderDebtsSelectHead.vue";
import xlsx from "xlsx";
import CommonUpdate from "@/common/CommonUpdate.vue";

export default {
  components: {
    VueContext,
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderFile,
    CommonAcbaList,
    BuilderAcbaModal,
    CommonShow,
    BuilderDebtsSelectHead,
    CommonUpdate,
  },
  props: ["selHead"],
  data() {
    return {
      dropdown: false,
      showMenu: false,
      showInfo: false,
      updateData: false,
      uploadData: [],
      header: [],
      exportTable: [],
      CaseData: this.$store.getters.CaseData,
      HistoryList: [
        {
          id: 1,
          name: "gurgenstepanyan",
          change: "Անձնագիր    AU8562  >   AU8562",
          date: "02.06.21",
          hour: "12.:30",
        },
      ],
      files: [],
    };
  },
  computed: {
    admin() {
      return this.$store.getters.userperm.some((v) => v === "addClient");
    },
    defaultHead() {
      return this.selHead.filter((v) => v.checked);
    },
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
  },
  methods: {
    uploadTable(event) {
      this.CaseData = event;
      this.updateData = true;
    },
    onCheck(event) {
      let arr = [];
      event.table.forEach((v) => arr.push(v.value));
      this.exportTable.push(arr);
      this.CaseData.forEach((i) => {
        if (i.id === event.id) {
          i.checked = event.value;
        }
      });
    },
    onexport() {
      // this.$store.dispatch("onexport");
      let column = this.header.map((v) => v.name);
      let animalWS = xlsx.utils.aoa_to_sheet([column, ...this.exportTable]);
      let wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, animalWS, "nameUsers");
      xlsx.writeFile(wb, "besafe.xlsx");
    },
    checkAll(e) {
      this.CaseData.forEach((i) => (i.checked = e.target.checked));
    },
    getHistory(id) {
      console.log(id);
      this.$store.commit("historyModal", true);
    },
    getFile(id) {
      console.log(id);
      this.$store.commit("fileModal", true);
    },
    getInfo(id) {
      this.showInfo = true;
    },
    renderHead(item) {
      this.header = item;
    },
    contextMenu(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped>
.subMenu:hover {
  background: rgb(247, 157, 187);
}
.ctx-grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
}
</style>