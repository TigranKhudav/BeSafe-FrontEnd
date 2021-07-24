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
      v-outside-click="() => (dropdown = false)"
      @click="dropdown = !dropdown"
      :dropdown="dropdown"
    ></common-show>

    <transition name="fade">
      <builder-debts-select-head
        v-if="dropdown"
        :selHead="Acba"
        @renderHead="renderHead"
      ></builder-debts-select-head>

      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>

      <builder-changes-modal
        @close="historyModal = false"
        :chagesList="ChangesList"
        v-if="historyModal"
        v-outside-click="outsideClick"
      ></builder-changes-modal>

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

      <builder-file
        v-if="showFile"
        @close="showFile = false"
        :files="files"
        :modal="'fileModal'"
      ></builder-file>
    </transition>

    <div v-if="loadData" class="modal-mask">
      <vue-simple-spinner size="55"></vue-simple-spinner>
    </div>

    <div class="d-flex justify-content-center w-full h-full resp-height mt-18">
      <div class="d-flex w-full">
        <div class="w-full overflow-x-auto">
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
              @sort="sortColm($event, item.column)"
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
                  class="ls-none py-7 ps-10 bg-pink-350 border-bottom ctx-btn"
                  role="button"
                  @mouseover="showMenu = true"
                >
                  <span class="text-white-100 fs-9">Պարտավորագիր</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 ctx-btn"
                  role="button"
                  @click="exportReference"
                  @mouseover="showMenu = true"
                >
                  <span class="text-white-100 fs-9">Տեղեկանք</span>
                </li>
              </div>
              <div
                class="ctx-grid"
                @mouseleave="showMenu = false"
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
                  @click="exportOneTime"
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
          <div v-observe-visibility="visibilityChanged"></div>
        </div>
      </div>
      <div class="my-auto">
        <common-button @click="onexport"
          ><div class="bg-20 w-12 h-12 bg-contain bg-no-repeat"></div
        ></common-button>
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
      loadData: true,
      historyModal: false,
      showRepaymentSchedule: false,
      header: [],
      count: 0,
      files: [],
      ChangesList: [],
      exportFile: null,
      MonthsNum: null,
      ForgivenessPercent: null,
      PrepaymentAmount: null,
      column: "",
      ascDesc: "",
      srchtxt: "",
    };
  },
  created() {
    this.getPartData({
      name: "acba",
      id: this.count,
      column: this.column,
      ascDesc: this.ascDesc,
    });
  },
  computed: {
    ...mapGetters(["CaseData", "user", "exportLT", "Acba"]),
    LineData: {
      get() {
        return this.CaseData;
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
    ...mapActions([
      "setNewValue",
      "uploadTable",
      "exportWord",
      "searchTable",
      "getPartData",
      "sort",
    ]),

    outsideClick(e) {
      this.historyModal = true;
    },

    visibilityChanged(isVisible) {
      if (isVisible) {
        this.loadData = true;
        this.count++;
        this.getPartData({
          name: "acba",
          id: this.count,
          column: this.column,
          ascDesc: this.ascDesc,
        });
      }
    },

    setValue(data, id) {
      this.CaseData.forEach((v) => {
        if (v.id === id) v[data.column] = data.newValue;
      });
      let setVal = {
        newValue: data.newValue,
        oldValue: data.oldValue,
        column: data.column,
        id,
        params: "acba",
      };
      this.setNewValue(setVal);
    },
    uploadTableMethod(event) {
      this.uploadTable({ id: "acba", newTable: event, header: this.Acba });
    },
    sortColm(e, column) {
      this.column = column;
      this.ascDesc = e;
      this.sort({ params: "acba", column, ascDesc: e });
      this.$store.commit("clearData");
    },
    Search(event, column) {
      this.searchTable({ page: "acba", column, text: event });
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
      let x = this.CaseData.find((v) => v.id === id).archives;
      this.ChangesList = x.map((v) => {
        let column = this.Acba.find((i) => i.column === v.data.change).name;
        return {
          date: v.data.date,
          hour: v.data.hour,
          name: v.data.name,
          new: v.data.new,
          old: v.data.old,
          id: v.id,
          column,
        };
      });
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
      this.exportWord(
        "acba?name=" +
          this.exportFile.name +
          "&surname=" +
          this.exportFile.surname +
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
          "&balance_principal_amount=" +
          this.exportFile.balance_principal_amount +
          "&credit_currency=" +
          this.exportFile.currency +
          "&filename=" +
          key
      );
    },
    exportRepayment() {
      let formula;
      let filename;
      if (!this.ForgivenessPercent) {
        formula =
          (this.exportFile.amount_collected - this.PrepaymentAmount) /
          this.MonthsNum;
        filename = "by_months";
      } else {
        formula =
          (this.exportFile.amount_collected -
            (this.PrepaymentAmount * this.ForgivenessPercent) / 100) /
          this.MonthsNum;
        filename = "forgiveness_interest_payment_in_the_months";
      }
      this.exportWord(
        "acba?branch=" +
          this.exportFile.branch +
          "&name=" +
          this.exportFile.name +
          "&surname=" +
          this.exportFile.surname +
          "&contract_num=" +
          this.exportFile.contract_num +
          "&amount_collected=" +
          this.exportFile.amount_collected +
          "&balance_principal_amount=" +
          this.exportFile.balance_principal_amount +
          "&interest_balance=" +
          this.exportFile.interest_balance +
          "&service_fee=" +
          this.exportFile.service_fee +
          "&fine=" +
          this.exportFile.fine +
          "&chef_dan=" +
          this.exportFile.chef_dan +
          "&procent=" +
          this.ForgivenessPercent +
          "&prepayment_amount=" +
          this.PrepaymentAmount +
          "&mounts_num=" +
          this.MonthsNum +
          "&formula=" +
          formula +
          "&filename=" +
          filename
      );
      this.showRepaymentSchedule = false;
    },
    exportOneTime() {
      this.exportWord(
        "acba?branch=" +
          this.exportFile.branch +
          "&name=" +
          this.exportFile.name +
          "&surname=" +
          this.exportFile.surname +
          "&contract_num=" +
          this.exportFile.contract_num +
          "&amount_collected=" +
          this.exportFile.amount_collected +
          "&balance_principal_amount=" +
          this.exportFilebalance_principal_amount +
          "&interest_balance=" +
          this.exportFile.interest_balance +
          "&service_fee=" +
          this.exportFile.service_fee +
          "&fine=" +
          this.exportFile.fine +
          "&chef_dan=" +
          this.exportFile.chef_dan +
          "&filename=one_time_payment"
      );
    },
    exportReference() {
      this.exportWord(
        "acba?name=" +
          this.exportFile.name +
          "&surname=" +
          this.exportFile.surname +
          "&contract_num=" +
          this.exportFile.contract_num +
          "&date_transfer_LegalOrgan=" +
          this.exportFile.date_transfer_LegalOrgan +
          "&common_obligations=" +
          this.exportFile.common_obligations +
          "&balance_principal_amount=" +
          this.exportFilebalance_principal_amount +
          "&interest_balance=" +
          this.exportFile.interest_balance +
          "&fine=" +
          this.exportFile.fine +
          "&filename=information_court"
      );
    },
  },
  watch: {
    CaseData() {
      if (this.CaseData.length !== 0) {
        this.loadData = false;
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