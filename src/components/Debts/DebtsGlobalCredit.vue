<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <span class="fs-12 text-gray-500">GlobalCredit</span>
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
      <builder-info-modal v-if="$store.state.showInfo"></builder-info-modal>
    </transition>

    <transition name="fade">
      <builder-file
        v-if="$store.state.showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <!-- static heigth -->
    <div class="d-flex justify-content-center w-full h-80 mt-12">
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
          </div>
          <div class="overflow-hidden">
            <common-acba-list
              v-for="item in CaseData"
              :key="item.id"
              :data="item"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
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
import BuilderFile from "../Builder/BuilderFile.vue";
import CommonAcbaList from "./CommonDebts/CommonAcbaList.vue";
import CommonShow from "./CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebts/BuilderDebtsSelectHead.vue";

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
  },
  data() {
    return {
      dropdown: false,
      showMenu: false,
      header: [],
      selHead: [
        {
          id: 1,
          checked: true,
          name: "Պայմանագրի N",
        },
        {
          id: 2,
          checked: true,
          name: "Անվանում",
        },
        {
          id: 3,
          checked: true,
          name: "Արժ.",
        },
        {
          id: 4,
          checked: true,
          name: "Գումար",
        },
        {
          id: 5,
          checked: true,
          name: "Ժամկետանց գումար",
        },
        {
          id: 6,
          checked: false,
          name: "Տոկոս",
        },
        {
          id: 7,
          checked: false,
          name: "Ժամկետանց տոկոս",
        },
        {
          id: 8,
          checked: false,
          name: "ԲՏՀԴ տոկ.",
        },
        {
          id: 9,
          checked: false,
          name: "Ժամկետանց գումարի տույժ",
        },
        {
          id: 10,
          checked: false,
          name: "Ժամկետանց տոկոսի տույժ",
        },
        {
          id: 11,
          checked: false,
          name: "Վարձավճար",
        },
        {
          id: 12,
          checked: false,
          name: "Ժամկետանց գումարի տոկոս",
        },
        {
          id: 13,
          checked: false,
          name: "Գրավի արժեք",
        },
        {
          id: 14,
          checked: false,
          name: "Երաշխավորության արժեքը",
        },
        {
          id: 15,
          checked: false,
          name: "Գրավի առարկա",
        },
        {
          id: 16,
          checked: false,
          name: "Տոկոսադրույք",
        },
        {
          id: 17,
          checked: false,
          name: "Փաստ. տոկոս.",
        },
        {
          id: 18,
          checked: false,
          name: "Օրացույցի հաշվարկման ձև",
        },
        {
          id: 19,
          checked: false,
          name: "Ռ.դ.",
        },
        {
          id: 20,
          checked: false,
          name: "Նպատակ",
        },
        {
          id: 21,
          checked: false,
          name: "Ծր.",
        },
        {
          id: 22,
          checked: false,
          name: "Երշ.",
        },
        {
          id: 23,
          checked: false,
          name: "Ձևանմ. տեսակ",
        },
        {
          id: 24,
          checked: false,
          name: "Մարզ",
        },
        {
          id: 25,
          checked: false,
          name: "Սահմանաչափ",
        },
        {
          id: 26,
          checked: false,
          name: "Պայմանագրի գումար",
        },
        {
          id: 27,
          checked: false,
          name: "Կնքման ամսաթիվ",
        },
        {
          id: 28,
          checked: false,
          name: "Հատկացման ամսաթիվ",
        },
        {
          id: 29,
          checked: false,
          name: "Վերջին տրման ամսաթիվ",
        },
        {
          id: 30,
          checked: false,
          name: "Սկզբ.մարման ժամկետ",
        },
        {
          id: 31,
          checked: false,
          name: "Մարման ժամկետ",
        },
        {
          id: 32,
          checked: false,
          name: "Ժամկետանց դառնալու օրը",
        },
        {
          id: 33,
          checked: false,
          name: "Ժամկ. օ.ք",
        },
        {
          id: 34,
          checked: false,
          name: "Ընդ. ժամկ.օ.ք",
        },
        {
          id: 35,
          checked: false,
          name: "Անընդ. ժամկ.լ.ք",
        },
        {
          id: 36,
          checked: false,
          name: "Հաճախորդ",
        },
        {
          id: 37,
          checked: false,
          name: "Իրավ. կ.",
        },
        {
          id: 38,
          checked: false,
          name: "Ոլորտ",
        },
        {
          id: 39,
          checked: false,
          name: "Բ. աշխ.",
        },
        {
          id: 40,
          checked: false,
          name: "Գրանցման հասցե",
        },
        {
          id: 41,
          checked: false,
          name: "Փաստացի Հասցե",
        },
        {
          id: 42,
          checked: false,
          name: "Հեռախոս",
        },
        {
          id: 43,
          checked: false,
          name: "Բջջային",
        },
        {
          id: 44,
          checked: false,
          name: "Անձը հաստ. փաստթ.    կոդ -",
        },
        {
          id: 45,
          checked: false,
          name: "Ա.հ.փ. Տրված",
        },
        {
          id: 46,
          checked: false,
          name: "Ա.հ.փ. ամսթ.",
        },
        {
          id: 47,
          checked: false,
          name: "Ա.հ.փ. Տիպ",
        },
        {
          id: 48,
          checked: false,
          name: "ՀՎՀՀ",
        },
        {
          id: 49,
          checked: false,
          name: "Գրանցման N",
        },
        {
          id: 50,
          checked: false,
          name: "Սեռը",
        },
        {
          id: 51,
          checked: false,
          name: "Ծննդյան ամսաթիվ",
        },
        {
          id: 52,
          checked: false,
          name: "Գրանցման երկիր",
        },
        {
          id: 53,
          checked: false,
          name: "Արտակարգ վերանայման տեսակ",
        },
        {
          id: 54,
          checked: false,
          name: "Նշում",
        },
        {
          id: 55,
          checked: false,
          name: "Նշում 2",
        },
        {
          id: 56,
          checked: false,
          name: "Նշում 3",
        },
        {
          id: 57,
          checked: false,
          name: "Նշում 4",
        },
        {
          id: 58,
          checked: false,
          name: "Անվանում",
        },
        {
          id: 59,
          checked: false,
          name: "Փուլ",
        },
        {
          id: 60,
          checked: false,
          name: "ԽՎԲ մասնագետ",
        },
        {
          id: 61,
          checked: false,
          name: "Է.Ռ.Ա.",
        },
        {
          id: 62,
          checked: false,
          name: "ԽՎԲ մուտքի ամսաթիվ",
        },
        {
          id: 63,
          checked: false,
          name: "Դատարան",
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
    contextMenu(item) {
      console.log(item);
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