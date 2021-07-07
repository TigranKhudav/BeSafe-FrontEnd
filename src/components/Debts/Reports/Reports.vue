<template>
  <div>
    <common-update class="position-absolute top-22 left-20">
      <div class="bg-41 w-11 h-11 bg-no-repeat bg-contain"></div>
      <span class="ms-6">Թարմացում</span>
    </common-update>
    <label for="file">
      <common-button
        class="position-absolute top-22 right-33 w-full max-w-32 p-2"
      >
        Ներկայացվող հաշվետվություն
        <input
          type="file"
          id="file"
          accept=".csv,application/vnd.ms-excel,.xlsx,.xls"
          role="button"
          class="opacity-0 w-0"
        />
      </common-button>
    </label>

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
        @clse="showInfo = false"
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

    <!-- Popups -->
    <transition name="fade">
      <builder-popup v-if="changesPopup" @close="changesPopup = false">
        <template v-slot:img>
          <div class="bg-43 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500"
          >Փոփոխությունները ուղարկված են հաստատման։</span
        >
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-popup v-if="warningPopup" @close="warningPopup = false">
        <template v-slot:img>
          <div class="bg-33 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Դուք չեք ուղարկել կատարողական թերթիկ N 5252245225 պայմ․համարով գործի
          համար։
        </span>
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-popup
        v-if="severalWarningPopup"
        @close="severalWarningPopup = false"
      >
        <template v-slot:img>
          <div class="bg-33 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <div class="max-w-35">
          <div class="mb-6">
            <span class="text-gray-500">
              Դուք չեք ուղարկել կատարողական թերթիկ N 5252245225 պայմ․համարով
              գործի համար։
            </span>
          </div>
          <div class="mb-6">
            <span class="text-gray-500 mt-10">
              Դուք չեք ուղարկել կատարողական թերթիկ N 5252245225 պայմ․համարով
              գործի համար։
            </span>
          </div>
          <span class="text-gray-500">
            Դուք չեք ուղարկել կատարողական թերթիկ N 5252245225 պայմ․համարով գործի
            համար։
          </span>
        </div>
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-popup v-if="warningCheck" @close="warningCheck = false">
        <template v-slot:img>
          <div class="bg-33 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Ստուգել վարույթ հարուցվելու փաստը N պայմ․ համարով գործի համար
        </span>
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-popup v-if="loadingPopup" @close="loadingPopup = false">
        <template v-slot:img>
          <div class="bg-45 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Կատարվում է տվյալների ներմուծում։
        </span>
      </builder-popup>
    </transition>

    <transition name="fade">
      <builder-popup v-if="complitedPopup" @close="complitedPopup = false">
        <template v-slot:img>
          <div class="bg-44 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Տվյալների ներմուծումը կատրված է։
        </span>
      </builder-popup>
    </transition>

    <div class="d-flex justify-content-center w-full h-83">
      <div class="d-flex h-full w-full">
        <div class="w-full overflow-x-auto">
          <div class="part-grid mb-8" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @check="checkAll($event)"></common-checkbox>
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
          <div>
            <common-acba-list
              v-for="item in CaseData"
              :key="item.id"
              :data="item"
              :head="header"
              @history="getHistory"
              @info="getInfo"
              @file="getFile"
              @onCheck="onCheck"
              :style="cssVar"
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
import BuilderChangesModal from "@/components/Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "@/components/Builder/BuilderInfoModal.vue";
import BuilderFile from "@/components/Builder/BuilderFile.vue";
import CommonAcbaList from "../CommonDebts/CommonAcbaList.vue";
import CommonShow from "../CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "../BuilderDebts/BuilderDebtsSelectHead.vue";
import BuilderPopup from "@/components/Builder/BuilderPopup.vue";
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
    BuilderPopup,
    CommonUpdate,
  },
  data() {
    return {
      complitedPopup: false,
      loadingPopup: false,
      warningCheck: false,
      severalWarningPopup: false,
      warningPopup: false,
      changesPopup: false,
      dropdown: false,
      showMenu: false,
      showInfo: false,
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
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
  },
  methods: {
    onCheck(event) {
      let arr = [];
      event.table.forEach((v) => arr.push(v.value));
      this.exportTable.push(arr);
      this.CaseData.forEach((i) => {
        if (i.id === event.id) {
          i.checked = event.value;
        }
      });
    },
    checkAll(e) {
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
    contextMenu(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped>
.ctx-grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
}
</style>