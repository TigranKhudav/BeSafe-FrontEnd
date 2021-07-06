<template>
  <div>
    <div class="position-absolute left-23 top-21">
      <span class="fs-12 text-gray-500">Օրվա ենթակա</span>
      <common-update></common-update>
    </div>

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
      <builder-file
        v-if="$store.state.showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div class="w-full overflow-x-auto">
          <div class="w-full d-flex justify-content-end mt-3">
            <div class="" role="button">
              <span class="fs-10 fw-600 text-gray-400">Արխիվ</span>
            </div>
          </div>
          <div class="part-grid mb-8" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @change.native="check($event)">
              </common-checkbox>
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
          <common-acba-list
            v-for="item in CaseData"
            :key="item.id"
            :data="item"
            :head="header"
            @history="getHistory"
            @info="getInfo"
            @file="getFile"
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
import BuilderChangesModal from "@/components/Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "@/components/Builder/BuilderInfoModal.vue";
import BuilderFile from "@/components/Builder/BuilderFile.vue";
import CommonAcbaList from "../CommonDebts/CommonAcbaList.vue";
import CommonShow from "../CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "../BuilderDebts/BuilderDebtsSelectHead.vue";
import CommonUpdate from "@/common/CommonUpdate.vue";

export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderFile,
    CommonAcbaList,
    CommonShow,
    BuilderDebtsSelectHead,
    CommonUpdate,
  },
  props: ["selHead"],
  data() {
    return {
      dropdown: false,
      showMenu: false,
      header: [],
      CaseData: [
        {
          id: 1,
          checked: false,
          info: "",
          name: "Մուսաելյան Արսեն Ալյոշայի",
          passport: "00663555",
          caseNum: "568599",
          priority: "",
          amountPaid: "",
        },
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
      files: [],
    };
  },
  computed: {
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
    check(e) {
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
  },
};
</script>