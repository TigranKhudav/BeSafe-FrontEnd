<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <h3 class="fs-11 text-gray-500">Acba</h3>
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
      @click="dropdown = !dropdown"
      :dropdown="dropdown"
    ></common-show>
    <!-- Modals -->
    <transition name="fade">
      <builder-debts-select-head
        v-if="dropdown"
        :selHead="Acba"
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
      <common-modal
        @send="exportRepayment"
        v-if="showRepaymentSchedule"
        @close="showRepaymentSchedule = false"
      >
        <div>
          <div class="row my-12">
            <div class="col px-0 me-10">
              <span class="text-gray-500 fs-8">Ամիսների քանակ</span>
            </div>
            <div class="col px-0">
              <input
                @input="MonthsNum = $event.target.value"
                class="max-w-25"
                type="text"
              />
            </div>
          </div>
          <div class="row my-12">
            <div class="col px-0 me-10">
              <span class="text-gray-500 fs-8">Ներման տոկոս</span>
            </div>
            <div class="col px-0">
              <input
                @input="ForgivenessPercent = $event.target.value"
                class="max-w-25"
                type="text"
              />
            </div>
          </div>
          <div class="row my-12">
            <div class="col px-0 me-10">
              <span class="text-gray-500 fs-8">Կանխավճարի չափ</span>
            </div>
            <div class="col px-0">
              <input
                @input="PrepaymentAmount = $event.target.value"
                class="max-w-25"
                type="text"
              />
            </div>
          </div>
        </div>
        <template v-slot:sub> Արտահանել </template>
      </common-modal>
    </transition>

    <transition name="fade">
      <builder-file
        v-if="showFile"
        @close="showFile = false"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div ref="table" class="w-full overflow-x-auto">
          <div class="part-grid mb-3" :style="cssVar">
            <div class="d-flex p-3 justify-content-center align-items-center">
              <common-checkbox @check="checkAll($event)"></common-checkbox>
            </div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <div class="min-w-12"></div>
            <common-clients-data-head
              v-for="item in (header = defaultHead)"
              :key="item.id"
              @search="Search($event, item.column)"
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
              @ctxmenu="contextMenu($event, item)"
              :style="cssVar"
            ></common-acba-list>
            <div v-observe-visibility="visibilityChanged"></div>
            <vue-context
              ref="menu"
              class="position-absolute w-full max-w-36 ps-0 outline-none d-flex"
            >
              <div class="ctx-grid max-w-29">
                <li
                  @click="exportLawsuit"
                  class="ls-none py-7 ps-10 bg-pink-350 border-bottom ctx-btn"
                  role="button"
                >
                  <span class="text-white-100 fs-9">Հայցադիմում</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 ctx-btn"
                  role="button"
                  @mouseover="showMenu = true"
                  @mouseleave="showMenu = false"
                >
                  <span class="text-white-100 fs-9">Պարտավորագիր</span>
                </li>
                <li class="ls-none"></li>
              </div>
              <div
                class="ctx-grid"
                @mouseover="showMenu = true"
                v-if="showMenu"
              >
                <li class="ls-none"></li>
                <li
                  class="
                    ls-none
                    py-7
                    ps-10
                    shadow-1
                    border-bottom
                    subMenu
                    bg-white-100
                  "
                  role="button"
                >
                  <span class="text-gray-500 fs-8">Մեկանգամյա մարման</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 shadow-1 subMenu bg-white-100"
                  role="button"
                  @click="showRepaymentSchedule = true"
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
          <common-button @click="onexport"
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
import CommonShow from "./CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "./BuilderDebts/BuilderDebtsSelectHead.vue";
import CommonUpdate from "@/common/CommonUpdate.vue";
import CommonModal from "@/common/CommonModal.vue";
import { mapActions, mapGetters } from "vuex";

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
    CommonShow,
    BuilderDebtsSelectHead,
    CommonUpdate,
    CommonModal,
  },
  data() {
    return {
      dropdown: false,
      showMenu: false,
      showInfo: false,
      showFile: false,
      showRepaymentSchedule: false,
      SearchColumn: "",
      SearchText: "",
      params: this.$route.params.id,
      header: [],
      count: 1,
      files: [],
      exportFile: null,
      MonthsNum: null,
      ForgivenessPercent: null,
      PrepaymentAmount: null,
    };
  },
  computed: {
    ...mapGetters(["CaseData", "HistoryList", "user", "exportLT", "Acba"]),
    LineData: {
      get() {
        if (this.SearchColumn) {
          return this.CaseData.filter((v) =>
            v[this.SearchColumn].includes(this.SearchText)
          );
        } else return this.CaseData;
      },
      set(check) {
        this.CaseData.forEach((i) => (i.checked = check));
      },
    },
    admin() {
      return this.user.perm.some((v) => v === "addPartnerCustomers");
    },
    defaultHead() {
      return this.Acba.filter((v) => v.checked);
    },
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
  },
  methods: {
    ...mapActions(["setNewValue", "uploadTable", "exportAcbaWord"]),

    visibilityChanged(isVisible) {
      console.log(isVisible);
      if (isVisible) {
        this.count++;
        this.$store.dispatch("getPartData", { name: "acba", id: this.count });
      }
    },

    loadMore() {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    },

    setValue(data, id) {
      this.CaseData.forEach((v) => {
        if (v.id === id) v[data.column] = data.newValue;
      });
      let setVal = {
        newValue: data.newValue,
        column: data.column,
        id,
        params: this.params,
      };
      this.setNewValue(setVal);
    },
    uploadTableMethod(event) {
      let data = {
        id: this.params,
        newTable: event,
        header: this.Acba,
      };
      this.uploadTable(data);
    },
    Search(event, column) {
      this.SearchColumn = column;
      this.SearchText = event;
    },
    onCheck(event) {
      this.CaseData.forEach((i) => {
        if (i.id === event.id) i.checked = event.value;
      });
    },
    onexport() {
      let arr = [];
      let x = this.LineData.filter((v) => v.checked);
      x.forEach((i) => {
        let y = [];
        this.header.forEach((v) => y.push(i[v.column]));
        arr.push(y);
      });
      let data = {
        header: this.header,
        exportTable: arr,
      };
      this.$store.commit("onexport", data);
    },
    checkAll(e) {
      this.LineData = e;
    },
    getHistory(id) {
      console.log(id);
      this.$store.commit("historyModal", true);
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
    contextMenu(e, item) {
      this.exportFile = item;
      this.$refs.menu.open(e);
    },
    exportLawsuit() {
      let key;
      if (this.exportFile.loan_type) {
        const loan_key = this.exportLT.find(
          (v) => v.name === this.exportFile.loan_type
        ).key;
        if (loan_key === "express_business") {
          key = this.exportFile.guarantee_contract_num
            ? "guarantee_express_business"
            : "express_business";
        } else key = loan_key;
      }
      this.exportAcbaWord(
        "word-download?name=" +
          this.exportFile.name +
          "&client_address=" +
          this.exportFile.client_address +
          "&common_obligations=" +
          this.exportFile.common_obligations +
          "&balance_principal_amount=" +
          this.exportFile.balance_principal_amount +
          "&interest_balance=" +
          this.exportFile.interest_balance +
          "&fine=" +
          this.exportFile.fine +
          "&daily_fine_rate=" +
          this.exportFile.daily_fine_rate +
          "&contract_num=" +
          this.exportFile.contract_num +
          "&contract_price=" +
          this.exportFile.contract_price +
          "&principal_balance_amount=" +
          this.exportFile.principal_balance_amount +
          "&filename=" +
          key
      );
    },
    exportRepayment() {
      const item = this.exportFile;
      if (!this.ForgivenessPercent) {
        const formula =
          (item.amount_collected - this.PrepaymentAmount) / this.MonthsNum;
        let d = new Date();
        d.setMonth(this.MonthsNum);

        function getMount(val) {
          console.log(val);
          let x = new Date();
          console.log(x.getMonth());
          let i = x.getMonth() + val;
          console.log(i);
          if (i > 12) {
            getMount(i - 12);
          } else return i;
        }

        let date = `20.${getMount(this.MonthsNum)}.${d.getFullYear()}`;
        const url =
          "word-download?branch=" +
          item.branch +
          "&name=" +
          item.name +
          "&contract_num=" +
          item.contract_num +
          "&amount_collected=" +
          item.amount_collected +
          "&balance_principal_amount=" +
          item.balance_principal_amount +
          "&interest_balance=" +
          item.interest_balance +
          "&service_fee=" +
          item.service_fee +
          "&fine=" +
          item.fine +
          "&chef_dan=" +
          item.chef_dan +
          "&filename=by_months";
        // this.exportAcbaWord(url);
      } else {
      }
    },
  },
};
</script>
<style scoped>
.subMenu:hover {
  background: rgb(247, 157, 187);
}
.ctx-grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
}
.ctx-btn:hover {
  background-color: rgb(163, 28, 48);
}
</style>