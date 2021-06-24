<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <span class="fs-12 text-gray-500">Ucom</span>
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
import BuilderAddCase from "../Builder/BuilderAddCase.vue";
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
    BuilderAddCase,
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
          name: "Հերթական համար",
        },
        {
          id: 2,
          checked: true,
          name: "Հիմնական պարտք",
        },
        {
          id: 3,
          checked: true,
          name: "ID",
        },
        {
          id: 4,
          checked: true,
          name: "Account",
        },
        {
          id: 5,
          checked: true,
          name: "Ընկերության անուն",
        },
        {
          id: 6,
          checked: false,
          name: "Կարգավիճակ",
        },
        {
          id: 7,
          checked: false,
          name: "Վերջին ստատուսի փոփոխման ամսաթիվ",
        },
        {
          id: 8,
          checked: false,
          name: "Հեռախոսի համար",
        },
        {
          id: 9,
          checked: false,
          name: "Սակագին",
        },
        {
          id: 10,
          checked: false,
          name: "Անուն",
        },
        {
          id: 11,
          checked: false,
          name: "Անձնագիր",
        },
        {
          id: 12,
          checked: false,
          name: "Անձնագրի տրման ամսաթիվ",
        },
        {
          id: 13,
          checked: false,
          name: "Անձնագիրը ում կողմից է տրված",
        },
        {
          id: 14,
          checked: false,
          name: "Հաշվառման հասցե",
        },
        {
          id: 15,
          checked: false,
          name: "Մարզ",
        },
        {
          id: 16,
          checked: false,
          name: "Համայնք",
        },
        {
          id: 17,
          checked: false,
          name: "Հասցեի տեսակ",
        },
        {
          id: 18,
          checked: false,
          name: "Բնակավայր",
        },
        {
          id: 19,
          checked: false,
          name: "Փողոց",
        },
        {
          id: 20,
          checked: false,
          name: "Շենք/Շինություն",
        },
        {
          id: 21,
          checked: false,
          name: "Շենք/Շինություն տեսակ",
        },
        {
          id: 22,
          checked: false,
          name: "Բնակարան/Տարածք",
        },
        {
          id: 23,
          checked: false,
          name: "Ծառայության պարտք",
        },
        {
          id: 24,
          checked: false,
          name: "Ընթացքում վճարված",
        },
        {
          id: 25,
          checked: false,
          name: "Ծննդյան ամսաթիվ",
        },
        {
          id: 26,
          checked: false,
          name: "Պայմանագրի համար",
        },
        {
          id: 27,
          checked: false,
          name: "Պայմանագրի կնքման ամսաթիվ",
        },
        {
          id: 28,
          checked: false,
          name: "Պարտքի սկզբի ամսաթիվ",
        },
        {
          id: 29,
          checked: false,
          name: "Device name 1",
        },
        {
          id: 30,
          checked: false,
          name: "Device price 1",
        },
        {
          id: 31,
          checked: false,
          name: "Device prepayment 1",
        },
        {
          id: 32,
          checked: false,
          name: "Device_penalty 1",
        },
        {
          id: 33,
          checked: false,
          name: "Device commitment period 1",
        },
        {
          id: 34,
          checked: false,
          name: "Device name 2",
        },
        {
          id: 35,
          checked: false,
          name: "Device price 2",
        },
        {
          id: 36,
          checked: false,
          name: "Device prepayment 2",
        },
        {
          id: 37,
          checked: false,
          name: "Device penalty 2",
        },
        {
          id: 38,
          checked: false,
          name: "Device commitment period 2",
        },
        {
          id: 39,
          checked: false,
          name: "Lուծման ամսաթիվ",
        },
        {
          id: 40,
          checked: false,
          name: "Promo Commitment period 1",
        },
        {
          id: 41,
          checked: false,
          name: "Promo Commitment period 2",
        },
        {
          id: 42,
          checked: false,
          name: "Promo name 1",
        },
        {
          id: 43,
          checked: false,
          name: "Promo commitment penalty 1",
        },
        {
          id: 44,
          checked: false,
          name: "Promo name 2",
        },
        {
          id: 45,
          checked: false,
          name: "Promo commitment penalty 2",
        },
        {
          id: 46,
          checked: false,
          name: "Contract cost",
        },
        {
          id: 47,
          checked: false,
          name: "Guarantor name",
        },
        {
          id: 48,
          checked: false,
          name: "Guarantor passport",
        },
        {
          id: 49,
          checked: false,
          name: "Guarantor address",
        },
        {
          id: 50,
          checked: false,
          name: "Guarantor Մարզ",
        },
        {
          id: 51,
          checked: false,
          name: "Guarantor Համայնք",
        },
        {
          id: 52,
          checked: false,
          name: "Guarantor Հասցեի տեսակ",
        },
        {
          id: 53,
          checked: false,
          name: "Guarantor Բնակավայր",
        },
        {
          id: 54,
          checked: false,
          name: "Guarantor Փողոց",
        },
        {
          id: 55,
          checked: false,
          name: "Guarantor Շենք/Շինություն",
        },
        {
          id: 56,
          checked: false,
          name: "Guarantor Շենք/Շինություն տեսակ",
        },
        {
          id: 57,
          checked: false,
          name: "Guarantor Բնակարան/Տարածք",
        },
        {
          id: 58,
          checked: false,
          name: "Guarantor number",
        },
        {
          id: 59,
          checked: false,
          name: "Colored number",
        },
        {
          id: 60,
          checked: false,
          name: "Colored number period",
        },
        {
          id: 61,
          checked: false,
          name: "Colored number penalty",
        },
        {
          id: 62,
          checked: false,
          name: "Սկզբնական պարտք",
        },
        {
          id: 63,
          checked: false,
          name: "Վարույթի կոդ",
        },
        {
          id: 64,
          checked: false,
          name: "E-request",
        },
        {
          id: 65,
          checked: false,
          name: "Գույքի տեսակ",
        },
        {
          id: 66,
          checked: false,
          name: "ԴԱՀԿ հոդված",
        },
        {
          id: 67,
          checked: false,
          name: "Պետտուրք",
        },
        {
          id: 68,
          checked: false,
          name: "Guarantee agreement signing date",
        },
        {
          id: 69,
          checked: false,
          name: "Guarantor birth date",
        },
        {
          id: 70,
          checked: false,
          name: "Social card number",
        },
        {
          id: 71,
          checked: false,
          name: "Service application",
        },
        {
          id: 72,
          checked: false,
          name: "Daily penalty",
        },
        {
          id: 73,
          checked: false,
          name: "Դատարանի անուն",
        },
        {
          id: 74,
          checked: false,
          name: "Դիմող",
        },
        {
          id: 75,
          checked: false,
          name: "Գործի համար",
        },
        {
          id: 76,
          checked: false,
          name: "Դատավոր",
        },
        {
          id: 77,
          checked: false,
          name: "Նշում",
        },
        {
          id: 78,
          checked: false,
          name: "Մուտքագրման ամսաթիվ",
        },
        {
          id: 79,
          checked: false,
          name: "Էլ․ հասցե",
        },
        {
          id: 80,
          checked: false,
          name: "Դատարանի ծախսեր",
        },
        {
          id: 81,
          checked: false,
          name: "Հայցագին",
        },
        {
          id: 82,
          checked: false,
          name: "API-ի վերադաձրած անվանում",
        },
        {
          id: 83,
          checked: false,
          name: "API-ի վերադաձրած ստատուս",
        },
        {
          id: 84,
          checked: false,
          name: "API-ի ուղարկման ամսաթիվ",
        },
        {
          id: 85,
          checked: false,
          name: "Նախորդ ստատուս",
        },
        {
          id: 86,
          checked: false,
          name: "Նախորդ ստատուսի փոփոխման ամսաթիվ",
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