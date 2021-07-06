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
    <!-- Modals -->
    <transition name="fade">
      <builder-add-case
        :prioritys="Prioritys"
        v-if="addCaseModal"
        @close="addCaseModal = false"
      ></builder-add-case>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        :chagesList="HistoryList"
        v-if="$store.state.showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal v-if="$store.state.showInfo"></builder-info-modal>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div class="w-full">
          <div class="grid-case mb-8">
            <div class="d-flex justify-content-center align-items-center">
              <common-checkbox @change.native="check($event)">
              </common-checkbox>
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
import CommonCheckbox from "../../common/CommonCheckbox.vue";
import CommonClientsDataHead from "../../common/CommonClientsDataHead.vue";
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
import BuilderAddCase from "../Builder/BuilderAddCase.vue";
import CommonCaseList from "../../common/CommonCaseList.vue";
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
    };
  },
  methods: {
    check(e) {
      this.CaseData.forEach((i) => (i.checked = e.target.checked));
    },
    getHistory(id) {
      console.log(id);
      this.$store.commit("historyModal", true);
    },
    getInfo(id) {
      this.$store.commit("getInfoModal", true);
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