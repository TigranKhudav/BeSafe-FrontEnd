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
          <div
            class="
              part-grid
              mb-3
              position-sticky
              top-0
              bg-white-100
              z-index-1
              w-min-cont
            "
            :style="cssVar"
          >
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
              @getAll="getAll"
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
import PartnersHandler from "@/mixins/PartnersHandler.js";

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
      getData: true,
    };
  },
  mixins: [PartnersHandler],
  computed: {
    ...mapGetters(["CaseData", "HistoryList"]),
    defaultHead() {
      return this.selHead.filter((v) => v.checked);
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
      "searchTable",
      "sort",
    ]),
    uploadTableMethod(event) {
      this.uploadTable({
        id: this.params,
        newTable: event,
        header: this.selHead,
      });
    },

    getHistory(id) {
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
    exportRates() {
      let checkedRates = this.CaseData.filter((v) => v.checked);
      if (checkedRates.length === 1) {
        this.exportWord("ucom?id=" + checkedRates[0].id);
      }
    },
  },
};
</script>