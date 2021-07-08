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
        @close="historyModal = false"
        :chagesList="HistoryList"
        v-if="historyModal"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
    </transition>

    <transition name="fade">
      <builder-file
        @close="showFile = false"
        v-if="showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div ref="table" class="w-full overflow-x-auto">
          <div class="part-grid mb-2" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @change.native="checkAll($event)">
              </common-checkbox>
            </div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <common-clients-data-head
              v-for="item in (header = defaultHead)"
              :key="item.id"
              >{{ item.name }}
            </common-clients-data-head>
          </div>
          <common-acba-list
            v-for="item in LineData"
            :key="item.id"
            :data="item"
            :head="header"
            @history="getHistory"
            @info="getInfo"
            @file="getFile"
            @setValue="setValue($event, item.id)"
            :style="cssVar"
          ></common-acba-list>
        </div>
        <div class="my-auto">
          <common-button
            ><div class="bg-19 w-12 h-12 bg-contain bg-no-repeat"></div
          ></common-button>
          <common-button
            ><div class="bg-20 w-12 h-12 bg-contain bg-no-repeat"></div
          ></common-button>
        </div>
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
      header: [],
      params: this.$route.params.id,
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
  mounted() {
    const eventHandler = () => {
      let scrollTop = this.$refs.table.scrollTop;
      let offsetHeight = this.$refs.table.offsetHeight;
      let scrollHeight = this.$refs.table.scrollHeight;
      let atTheBottom = scrollTop + offsetHeight === scrollHeight;
      let data = { name: this.$route.params.id, id: count };
      if (atTheBottom) {
        this.$store.dispatch("getPartData", data);
        this.count++;
      }
    };
    this.$refs.table.addEventListener("scroll", eventHandler);
  },
  computed: {
    LineData() {
      if (this.SearchColumn) {
        return this.CaseData.filter((v) =>
          v[`${this.SearchColumn}`].includes(this.SearchText)
        );
      } else return this.CaseData;
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
      return this.$store.getters.userperm.some((v) => v === "addClient");
    },
  },
  methods: {
    setValue(data, id) {
      let setVal = {
        newValue: data.newValue,
        column: data.column,
        id,
        params: this.params,
      };
      console.log("hi");
      // console.log(setVal);
    },
    Search(event, column) {
      this.SearchColumn = column;
      this.SearchText = event;
    },
    uploadTableMethod(event) {
      let data = {
        id: this.params,
        newTable: event,
        header: this.header,
      };
      this.$store.dispatch("uploadTable", data);
    },
    checkAll(e) {
      this.CaseData.forEach((i) => (i.checked = e.target.checked));
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
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 8fr 8fr 8fr 8fr 8fr;
}
</style>