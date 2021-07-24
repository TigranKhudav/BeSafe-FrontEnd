<template>
  <div>
    <common-button
      @click="addCaseModal = true"
      class="position-absolute top-22 right-22 w-full max-w-28"
    >
      <div class="d-flex align-items-center p-4">
        <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
        <span> Ավելացնել</span>
      </div>
    </common-button>

    <transition name="fade">
      <builder-add-case
        :prioritys="Prioritys"
        v-if="addCaseModal"
        @close="addCaseModal = false"
      ></builder-add-case>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        @close="showHistory = false"
        :chagesList="HistoryList"
        v-if="showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div class="w-full">
          <div class="grid-case mb-6">
            <div class="d-flex justify-content-center align-items-center">
              <common-checkbox @check="check"></common-checkbox>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <common-clients-data-head>Անուն Ազգանուն</common-clients-data-head>
            <common-clients-data-head>Անձնագիր</common-clients-data-head>
            <common-clients-data-head>Գործի համար</common-clients-data-head>
            <common-clients-data-head>Կարգավիճակ</common-clients-data-head>
            <common-clients-data-head>Վճարված գումար</common-clients-data-head>
          </div>
          <div class="overflow-hidden">
            <common-case-list
              v-for="item in CaseData"
              :key="item.id"
              :data="item"
              @history="getHistory"
              @info="getInfo"
              :prioritys="Prioritys"
            ></common-case-list>
          </div>
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
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
import BuilderAddCase from "../Builder/BuilderAddCase.vue";
import CommonCaseList from "@/common/CommonCaseList.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderAddCase,
    CommonCaseList,
  },
  data() {
    return {
      showFile: false,
      showHistory: false,
      showInfo: false,
      addCaseModal: null,
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
        {
          id: 2,
          checked: false,
          info: "",
          name: "Գրիգորյան Աշոտ Ալյոշայի",
          passport: "00663555",
          caseNum: "568599",
          priority: "",
          amountPaid: "",
        },
        {
          id: 3,
          checked: false,
          info: "",
          name: "Հակոբյան Արմեն Ալյոշայի",
          passport: "00663555",
          caseNum: "568599",
          priority: "",
          amountPaid: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["Prioritys", "HistoryList"]),
  },
  methods: {
    check(e) {
      this.CaseData.forEach((i) => (i.checked = e));
    },
    getHistory(id) {
      console.log(id);
      this.showHistory = true;
    },
    getInfo(id) {
      this.showInfo = true;
    },
  },
};
</script>
<style scoped>
.grid-case {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 7fr 5fr 5fr 10fr 4fr;
}
</style>