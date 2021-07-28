<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <span class="fs-11 text-gray-500">{{ PartName }}</span>
    </div>
    <common-update
      @table="uploadTableMethod"
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

    <transition name="fade">
      <builder-debts-select-head
        v-if="dropdown"
        :selHead="selHead"
        @renderHead="renderHead"
      ></builder-debts-select-head>

      <builder-changes-modal
        @close="historyModal = false"
        :chagesList="HistoryList"
        v-if="historyModal"
      ></builder-changes-modal>

      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>

      <builder-file
        @close="showFile = false"
        v-if="showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div v-if="loadData" class="modal-mask">
      <vue-simple-spinner size="55"></vue-simple-spinner>
    </div>

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
        <common-button v-if="params === 'ucom'" @click="exportRates">
          <div class="bg-19 w-12 h-12 bg-contain bg-no-repeat"></div>
        </common-button>
        <common-button @click="onexport"
          ><div class="bg-20 w-12 h-12 bg-contain bg-no-repeat"></div>
        </common-button>
      </div>
    </div>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonCheckbox from "@/common/CommonCheckbox.vue";
import CommonClientsDataHead from "@/common/CommonClientsDataHead.vue";
import BuilderChangesModal from "../../Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "../../Builder/BuilderInfoModal.vue";
import BuilderFile from "../../Builder/BuilderFile.vue";
import CommonAcbaList from "../CommonDebts/CommonAcbaList.vue";
import CommonShow from "../CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebtsSelectHead.vue";
import CommonUpdate from "@/common/CommonUpdate.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    CommonUpdate,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderFile,
    CommonAcbaList,
    CommonShow,
    BuilderDebtsSelectHead,
  },
  props: ["selHead", "PartName"],
  data() {
    return {
      dropdown: false,
      showMenu: false,
      showInfo: false,
      showFile: false,
      historyModal: false,
      loadData: true,
      header: [],
      count: 1,
      exportTable: [],
      params: this.$route.params.id,
      column: "",
      ascDesc: "",
      files: [],
    };
  },
  created() {
    this.getPartData({
      name: this.params,
      id: this.count,
      column: this.column,
      ascDesc: this.ascDesc,
    });
  },
  computed: {
    ...mapGetters(["CaseData", "HistoryList"]),
    LineData: {
      get() {
        return this.CaseData;
      },
      set(check) {
        this.CaseData.forEach((i) => (i.checked = check));
      },
    },
    defaultHead() {
      return this.selHead.filter((v) => v.checked);
    },
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
    admin() {
      return this.$store.getters.user.perm.some(
        (v) => v === "addPartnerCustomers"
      );
    },
  },
  methods: {
    ...mapActions([
      "setNewValue",
      "uploadTable",
      "getPartData",
      "exportWord",
      "sort",
    ]),

    visibilityChanged(isVisible) {
      if (isVisible) {
        this.loadData = true;
        this.count++;
        this.getPartData({
          name: this.params,
          id: this.count,
          column: this.column,
          ascDesc: this.ascDesc,
        });
      }
    },

    setValue(data, id) {
      this.CaseData.forEach((v) => {
        if (v.id === id) v[data.column] = data.newValue;
      });
      let setVal = {
        newValue: data.newValue,
        column: data.column,
        oldValue: data.oldValue,
        id,
        params: this.params,
      };
      this.setNewValue(setVal);
    },
    uploadTableMethod(event) {
      this.uploadTable({
        id: this.params,
        newTable: event,
        header: this.selHead,
      });
    },
    sortColm(e, column) {
      this.column = column;
      this.ascDesc = e;
      this.sort({ params: this.params, column, ascDesc: e });
      this.$store.commit("clearData");
    },
    // Search(event, column) {
    //   this.SearchColumn = column;
    //   this.SearchText = event;
    // },
    onCheck(event) {
      this.CaseData.forEach((i) => {
        if (i.id === event.id) i.checked = event.value;
      });
    },
    checkAll(e) {
      this.LineData = e;
    },
    getHistory(id) {
      console.log(id);
      this.historyModal = true;
    },
    getFile(id) {
      console.log(id);
      this.showFile = true;
    },
    getInfo(id) {
      this.showInfo = true;
    },
    renderHead(item) {
      this.header = item;
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
    exportRates() {
      let checkedRates = this.CaseData.filter((v) => v.checked);
      if (checkedRates.length === 1) {
        this.exportWord("ucom?id=" + checkedRates[0].id);
      }
    },
  },
  watch: {
    CaseData() {
      if (this.CaseData.length !== 0) {
        this.loadData = false;
      } else this.loadData = false;
    },
  },
};
</script>