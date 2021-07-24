<template>
  <div>
    <div class="position-absolute left-23 top-21">
      <span class="fs-12 text-gray-500">Օրվա ենթակա</span>
      <common-update @table="uploadTableMethod" v-if="admin" class="mt-5">
        <div class="bg-41 w-11 h-11 bg-no-repeat bg-contain"></div>
        <span class="ms-6">Թարմացում</span>
      </common-update>
    </div>

    <common-show
      @click.native="dropdown = !dropdown"
      :dropdown="dropdown"
    ></common-show>

    <div class="position-absolute right-23 top-25">
      <router-link to="/debts/archive">
        <span class="fs-10 fw-600 text-gray-400">Արխիվ</span>
      </router-link>
    </div>

    <transition name="fade">
      <builder-popup v-if="loadingPopup" @close="loadingPopup = false">
        <template v-slot:img>
          <div class="bg-45 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Կատարվում է տվյալների ներմուծում։
        </span>
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-debts-select-head
        v-if="dropdown"
        :selHead="Acba"
        @renderHead="renderHead"
      ></builder-debts-select-head>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        :chagesList="HistoryList"
        @close="showHistory = false"
        v-if="showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
    </transition>

    <div class="d-flex justify-content-center w-full h-full resp-height mt-18">
      <div class="d-flex w-full">
        <div class="w-full overflow-x-auto">
          <div class="part-grid mb-3" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @check="checkAll($event)"></common-checkbox>
            </div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <common-clients-data-head
              v-for="item in (header = defaultHead)"
              :key="item.id"
              @sort="sortColm($event, item.column)"
              @search="Search($event, item.column)"
              >{{ item.name }}
            </common-clients-data-head>
          </div>
          <div>
            <common-acba-list
              v-for="(item, i) in LineData"
              :key="i"
              :head="header"
              :data="item"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
              @onCheck="onCheck"
              @setValue="setValue($event, item.id)"
              :style="cssVar"
            ></common-acba-list>
          </div>
          <div v-observe-visibility="visibilityChanged"></div>
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
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonCheckbox from "@/common/CommonCheckbox.vue";
import CommonClientsDataHead from "@/common/CommonClientsDataHead.vue";
import BuilderChangesModal from "@/components/Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "@/components/Builder/BuilderInfoModal.vue";
import CommonAcbaList from "../CommonDebts/CommonAcbaList.vue";
import CommonShow from "../CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "../BuilderDebts/BuilderDebtsSelectHead.vue";
import CommonUpdate from "@/common/CommonUpdate.vue";
import { mapGetters, mapActions } from "vuex";
import BuilderPopup from "@/components/Builder/BuilderPopup.vue";

export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    CommonAcbaList,
    CommonShow,
    BuilderDebtsSelectHead,
    CommonUpdate,
    BuilderPopup,
  },
  data() {
    return {
      dropdown: false,
      showMenu: false,
      showInfo: false,
      showHistory: false,
      updateData: false,
      loadingPopup: false,
      count: 1,
      header: [],
      files: [],
      column: "",
      ascDesc: "",
      srchtxt: "",
    };
  },
  computed: {
    ...mapGetters(["SubDayCase", "HistoryList", "user", "Acba"]),

    LineData: {
      get() {
        return this.SubDayCase;
      },
      set(check) {
        this.SubDayCase.forEach((i) => (i.checked = check));
      },
    },

    defaultHead() {
      return this.Acba.filter((v) => v.checked);
    },
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
    admin() {
      return this.user.perm.some((v) => v === "updateSubjectDay");
    },
  },
  methods: {
    ...mapActions(["uploadSubjecDay", "getSubDayData", "sort"]),

    sortColm(e, column) {
      this.column = column;
      this.ascDesc = e;
      this.sort({ params: this.params, column, ascDesc: e });
    },

    visibilityChanged(isVisible) {
      if (isVisible) {
        this.count++;
        this.getSubDayData({
          name: "acba",
          id: this.count,
          column: this.column,
          ascDesc: this.ascDesc,
        });
      }
    },
    uploadTableMethod(event) {
      this.loadingPopup = true;
      this.uploadSubjecDay({ newTable: event, header: this.Acba }).then(() => {
        this.loadingPopup = false;
      });
    },
    checkAll(e) {
      this.SubDayCase.forEach((i) => (i.checked = e.target.checked));
    },
    onCheck(event) {
      this.SubDayCase.forEach((i) => {
        if (i.id === event.id) i.checked = event.value;
      });
    },
    onexport() {
      let arr = [];
      let x = this.LineData.filter((v) => v.checked);
      x.forEach((i) => {
        let y = [];
        this.header.forEach((v) => y.push(i[v.column]));
        arr.push(y);
      });
      let data = {
        header: this.header,
        exportTable: arr,
      };
      this.$store.commit("onexport", data);
    },
    getHistory(id) {
      this.showHistory = true;
    },
    getFile(id) {
      console.log(id);
    },
    getInfo(id) {
      this.showInfo = true;
    },
    renderHead(item) {
      this.header = item;
    },
  },
};
</script>