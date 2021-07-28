<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <h3 class="fs-11 text-gray-500">Acba</h3>
    </div>

    <common-button
      v-if="adminRemove"
      @click="removeRows"
      class="position-absolute left-23 top-22 max-w-28"
    >
      Ջնջել ({{ checkedRows.length }})
    </common-button>

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
          <div>
            <div
              class="
                part-grid
                mb-3
                position-sticky
                top-0
                bg-white-100
                z-index-4
                w-min-cont
              "
              :style="cssVar"
            >
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
              <div class="w-full max-w-29">
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 ctx-btn border-bottom"
                  role="button"
                  @click="exportReference"
                >
                  <span class="text-white-100 fs-9">Տեղեկանք</span>
                </li>
                <li
                  @click="exportLawsuit"
                  class="ls-none py-7 ps-10 bg-pink-350 border-bottom ctx-btn"
                  role="button"
                >
                  <span class="text-white-100 fs-9">Հայցադիմում</span>
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
    CommonButton,
    CommonButton,
  },
  data() {
    return {
      dropdown: false,
      showInfo: false,
      showFile: false,
      loadData: true,
      historyModal: false,
      header: [],
      count: 1,
      files: [],
      ChangesList: [],
      exportFile: null,
      MonthsNum: null,
      ForgivenessPercent: null,
      PrepaymentAmount: null,
      column: "",
      ascDesc: "",
      srchtxt: "",
      getData: true,
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
    ...mapGetters(["CaseData", "user", "exportLT", "Acba", "CourtsList"]),
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
    adminRemove() {
      return this.user.perm.some((v) => v === "removeInfo");
    },
    defaultHead() {
      return this.Acba.filter((v) => v.checked);
    },
    cssVar() {
      return {
        "--cols": this.header.length,
      };
    },
    checkedRows() {
      return this.LineData.filter((v) => v.checked);
    },
  },
  methods: {
    ...mapActions([
      "setNewValue",
      "uploadTable",
      "exportWord",
      "searchTable",
      "getPartData",
      "deletePartRows",
      "sort",
    ]),

    outsideClick(e) {
      this.historyModal = true;
    },

    visibilityChanged(isVisible) {
      if (isVisible && this.getData) {
        this.count++;
        this.loadData = true;
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
      this.getData = false;
      this.searchTable({ page: "acba", column, text: event });
    },
    onCheck(event) {
      this.CaseData.forEach((i) => {
        if (i.id === event.id) i.checked = event.value;
      });
    },
    removeRows() {
      let ids = this.checkedRows.map((v) => v.id);
      this.deletePartRows(ids);
    },
    onexport() {
      let arr = [];
      this.checkedRows.forEach((i) => {
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
      let loan_key;
      if (this.exportFile.loan_type) {
        loan_key = this.exportLT.find(
          (v) => v.name === this.exportFile.loan_type
        ).key;
      }
      if (loan_key === "express_business") {
        key = this.exportFile.guarantee_contract_num
          ? "guarantee_express_business"
          : "express_business";
      } else key = loan_key;
      if (this.exportFile.guarantee_contract_num) {
        let thre = this.exportFile.loan_type.includes("3");
        let eleven = this.exportFile.loan_type.includes("11");
        if (thre) {
          console.log(thre);
          key = "guarantee_express_business";
        }
        if (eleven) {
          console.log(eleven);
          key = "guarantee_standart_payment_card";
        }
      }

      let reg = this.exportFile.client_address.split(" ")[0];

      let courtObj = this.CourtsList.find((e) => e.region.includes(reg));

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
          "&authority=" +
          this.exportFile.authority +
          "&passport_series=" +
          this.exportFile.passport_series +
          "&date_of_issue=" +
          this.exportFile.date_of_issue +
          "&service_fee=" +
          this.exportFile.service_fee +
          "&court=" +
          courtObj.court +
          "&court_address=" +
          courtObj.address +
          "&filename=" +
          key
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
          this.exportFile.balance_principal_amount +
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
      } else this.loadData = false;
    },
  },
};
</script>
<style scoped>
.ctx-btn:hover {
  background-color: rgb(163, 28, 48);
}
</style>