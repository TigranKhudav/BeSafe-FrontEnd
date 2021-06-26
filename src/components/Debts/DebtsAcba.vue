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
      <builder-changes-modal
        :chagesList="HistoryList"
        v-if="$store.state.showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal v-if="$store.state.showInfo"></builder-info-modal>
    </transition>

    <transition name="fade">
      <builder-acba-modal
        :modal="'showRepaymentSchedule'"
        v-if="$store.state.showRepaymentSchedule"
      ></builder-acba-modal>
    </transition>

    <transition name="fade">
      <builder-file
        v-if="$store.state.showFile"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <!-- static heigth -->
    <div class="d-flex justify-content-center w-full h-83 mt-12">
      <div class="d-flex h-full w-full">
        <div class="w-full overflow-x-scroll">
          <div class="grid mb-8" :style="cssVar">
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
          <div class="">
            <common-acba-list
              v-for="item in CaseData"
              :key="item.id"
              :data="item"
              :head="header"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
              :prioritys="Prioritys"
              @contextmenu.prevent.native="$refs.menu.open"
              :style="cssVar"
            ></common-acba-list>
            <vue-context
              ref="menu"
              class="position-absolute w-full max-w-35 ps-0 outline-none d-flex"
            >
              <div class="ctx-grid max-w-29">
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 border-bottom"
                  role="button"
                >
                  <span class="text-white fs-9">Հայցադիմում</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 part"
                  role="button"
                  @mouseover="showMenu = true"
                >
                  <span class="text-white fs-9">Պարտավորագիր</span>
                </li>
                <li class="ls-none"></li>
              </div>
              <div class="ctx-grid" v-if="showMenu">
                <li class="ls-none"></li>
                <li
                  class="ls-none py-7 ps-10 shadow-1 border-bottom subMenu"
                  role="button"
                >
                  <span class="text-gray-500 fs-8">Մեկանգամյա մարման</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 shadow-1 subMenu"
                  role="button"
                  @click="$store.state.showRepaymentSchedule = true"
                >
                  <span class="text-gray-500 fs-8">Գրաֆիկով մարման</span>
                </li>
              </div>
            </vue-context>
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
import VueContext from "vue-context";
import CommonButton from "@/common/CommonButton.vue";
import CommonCheckbox from "@/common/CommonCheckbox.vue";
import CommonClientsDataHead from "@/common/CommonClientsDataHead.vue";
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
import BuilderFile from "../Builder/BuilderFile.vue";
import CommonAcbaList from "./CommonDebts/CommonAcbaList.vue";
import BuilderAcbaModal from "./BuilderDebts/BuilderAcbaModal.vue";
import CommonShow from "./CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebts/BuilderDebtsSelectHead.vue";

export default {
  components: {
    VueContext,
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    BuilderFile,
    CommonAcbaList,
    BuilderAcbaModal,
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
        {
          id: 8,
          checked: false,
          name: "ժամկետանց օրեր",
        },
        {
          id: 9,
          checked: false,
          name: "ժամկետանց խումբ",
        },
        {
          id: 10,
          checked: false,
          name: "Սեգմենտ",
        },
        {
          id: 11,
          checked: false,
          name: "Մասնակից",
        },
        {
          id: 12,
          checked: false,
          name: "Պատասխանատու ՊԿ",
        },
        {
          id: 13,
          checked: false,
          name: "Վերահսկողություն",
        },
        {
          id: 14,
          checked: false,
          name: "Մինչև",
        },
        {
          id: 15,
          checked: false,
          name: "Փոխանցման ա/թ /ամսաթիվ/",
        },
        {
          id: 16,
          checked: false,
          name: "Վարկի սկիզբ",
        },
        {
          id: 17,
          checked: false,
          name: "Պայմանագրի համար",
        },
        {
          id: 18,
          checked: false,
          name: "Պայմանագրային գումար /արժույթով/",
        },
        {
          id: 19,
          checked: false,
          name: "Ընթացիկ ոչ ժամկետանց գումար (արժույթով)",
        },
        {
          id: 20,
          checked: false,
          name: "ժամկետանց մնացորդ (արժույթով)",
        },
        {
          id: 21,
          checked: false,
          name: "Հավաքագրվող գումար (AMD)",
        },
        {
          id: 22,
          checked: false,
          name: "Ընդհանուր պարտավորություն (AMD)",
        },
        {
          id: 23,
          checked: false,
          name: "Փակման ա/թ",
        },
        {
          id: 24,
          checked: false,
          name: "Փակողի ՊԿ",
        },
        {
          id: 25,
          checked: false,
          name: "Արտաքին իրավաբան",
        },
        {
          id: 26,
          checked: false,
          name: "Արտաքին իրավաբանական կազմակերպությանը փոխանցման ամսաթիվ",
        },
        {
          id: 27,
          checked: false,
          name: "Արտաքին իրավաբանի հաճախորդի համար",
        },
        {
          id: 28,
          checked: false,
          name: "Հաճախորդի հեռախոսահամար",
        },
        {
          id: 29,
          checked: false,
          name: "Հաճախորդի գործող ապառիկ վարկերի հեռախոսահամարներ",
        },
        {
          id: 30,
          checked: false,
          name: "Երաշխավորի հեռախոսահամար",
        },
        {
          id: 31,
          checked: false,
          name: "Գրավատուի հեռախոսահամար",
        },
        {
          id: 32,
          checked: false,
          name: "Հաճախորդի հասցե",
        },
        {
          id: 33,
          checked: false,
          name: "Վերջին մարման ա/թ",
        },
        {
          id: 34,
          checked: false,
          name: "Պայմանավորվածություններ",
        },
        {
          id: 35,
          checked: false,
          name: "Պայմանավորվածության վերջնաժամկետ",
        },
        {
          id: 36,
          checked: false,
          name: "Վերջին պայմանավորվածության կարգավիճակ",
        },
        {
          id: 37,
          checked: false,
          name: "Վերջին պայմանավորվածության ամսաթիվ",
        },
        {
          id: 38,
          checked: false,
          name: "Խմբի համար",
        },
        {
          id: 39,
          checked: false,
          name: "Գրավ",
        },
        {
          id: 40,
          checked: false,
          name: "Հիշեցումներ",
        },
        {
          id: 41,
          checked: false,
          name: "Մայր գումարի մնացորդ",
        },
        {
          id: 42,
          checked: false,
          name: "Տոկոսագումարի մնացորդ",
        },
        {
          id: 43,
          checked: false,
          name: "Վարկային գծի չօգտագործված մասի տոկոսագումար",
        },
        {
          id: 44,
          checked: false,
          name: "Սպասարկման վճար",
        },
        {
          id: 45,
          checked: false,
          name: "Տուգանք",
        },
        {
          id: 46,
          checked: false,
          name: "Պետ․ տուրք",
        },
        {
          id: 47,
          checked: false,
          name: "Ապահովագրավճար",
        },
        {
          id: 48,
          checked: false,
          name: "Տուգանքի օրական դրույքաչափ",
        },
        {
          id: 49,
          checked: false,
          name: "Տուգանքի դադարեցման ա/թ",
        },
        {
          id: 50,
          checked: false,
          name: "Պետ. տուրքի փոխանցումից հետո տուգանքի դադարեցման ա/թ",
        },
        {
          id: 51,
          checked: false,
          name: "Պետ. տուրքեր (ա/թ.- գումար- չմարված գումար)",
        },
        {
          id: 52,
          checked: false,
          name: "Վերջին փուլի տեսակ - ամսաթիվ",
        },
        {
          id: 53,
          checked: false,
          name: "Հայցի ապահովում - ամսաթիվ",
        },
      ],
      CaseData: [
        {
          id: 1,
          checked: false,
          info: "",
          1: "Մուսաելյան Արսեն Ալյոշայի",
          2: "00663555",
          3: "568599",
          4: "",
          5: "",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
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
      this.$store.commit("getInfoModal", true);
    },
    renderHead(item) {
      console.log(item);
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
  grid-template-columns: 1fr 1fr 1fr 1fr repeat(var(--cols), 5fr);
}
.subMenu:hover {
  background: rgb(247, 157, 187);
}
.ctx-grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
}
</style>