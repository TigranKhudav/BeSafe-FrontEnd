<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <span class="fs-12 text-gray-500">Acba</span>
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
      <builder-add-case
        :prioritys="Prioritys"
        v-if="$store.state.showAddCase"
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

    <!-- <builder-acba-modal></builder-acba-modal> -->

    <transition name="fade">
      <builder-file
        v-if="$store.state.showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <!-- static heigth -->
    <div class="d-flex justify-content-center w-full h-80 mt-18">
      <div class="d-flex h-full w-full">
        <div class="w-full">
          <div class="grid mb-8">
            <div class="d-flex justify-content-center align-items-center">
              <common-checkbox @change.native="check($event)">
              </common-checkbox>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <common-clients-data-head
              v-for="item in (header = defaultHead)"
              :key="item.id"
              >{{ item.name }}</common-clients-data-head
            >
            <!-- <common-clients-data-head>Հաճախորդի համար</common-clients-data-head>
            <common-clients-data-head>Անուն Ազգանուն</common-clients-data-head>
            <common-clients-data-head>Հաճախորդի դաս</common-clients-data-head>
            <common-clients-data-head>Վարկի տեսակ</common-clients-data-head> -->
          </div>
          <div class="overflow-hidden">
            <common-acba-list
              v-for="item in CaseData"
              :key="item.id"
              :data="item"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
              :prioritys="Prioritys"
            ></common-acba-list>
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
import BuilderFile from "../Builder/BuilderFile.vue";
import CommonAcbaList from "./CommonDebts/CommonAcbaList.vue";
import BuilderAcbaModal from "./BuilderDebts/BuilderAcbaModal.vue";
import CommonShow from "./CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebts/BuilderDebtsSelectHead.vue";

export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderAddCase,
    BuilderFile,
    CommonAcbaList,
    BuilderAcbaModal,
    CommonShow,
    BuilderDebtsSelectHead,
  },
  data() {
    return {
      dropdown: false,
      header: [],
      selHead: [
        {
          id: 1,
          checked: true,
          name: "Մասնաճյուղ",
        },
        {
          id: 2,
          checked: true,
          name: "Հաճախորդի համար",
        },
        {
          id: 3,
          checked: true,
          name: "Անուն Ազգանուն / Անվանում",
        },
        {
          id: 4,
          checked: true,
          name: "Հաճախորդի դաս",
        },
        {
          id: 5,
          checked: true,
          name: "Վարկի տեսակ",
        },
        {
          id: 6,
          checked: false,
          name: "Արժույթ",
        },
        {
          id: 7,
          checked: false,
          name: "Կարգավիճակ",
        },
      ],
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
      Prioritys: [
        {
          id: 1,
          priority: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        {
          id: 2,
          priority:
            "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        { id: 3, priority: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
        {
          id: 4,
          priority: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        {
          id: 5,
          priority:
            "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        { id: 6, priority: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
        {
          id: 7,
          priority: "ՎԿ փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        {
          id: 8,
          priority:
            "Հայցադիմումի փաստաթղթերը ուղարկվել են դատարան առանց պայմանագրի",
        },
        { id: 9, priority: "ՎԿ-2 փաստաթղթերը տրամադրված են կատարողին" },
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
      this.$store.commit("getInfoModal", true);
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
  grid-template-columns: 1fr 1fr 1fr 1fr 3fr 3fr 3fr 3fr 3fr;
}
</style>