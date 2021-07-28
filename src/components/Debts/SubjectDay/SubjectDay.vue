<template>
  <div>
    <div class="position-absolute left-23 top-21">
      <span class="fs-12 text-gray-500">Օրվա ենթակա</span>
      <common-update @table="uploadTableMethod" v-if="adminUpdate" class="mt-5">
        <div class="bg-41 w-11 h-11 bg-no-repeat bg-contain"></div>
        <span class="ms-6">Թարմացում</span>
      </common-update>
    </div>

    <common-button
      v-if="adminRemove"
      @click="removeRows"
      class="position-absolute left-35 top-22 max-w-28"
    >
      Ջնջել ({{ checkedRows.length }})
    </common-button>

    <common-show
      @click.native="dropdown = !dropdown"
      :dropdown="dropdown"
    ></common-show>

    <transition name="fade">
      <builder-popup v-if="loadingPopup" @close="loadingPopup = false">
        <template v-slot:img>
          <div class="bg-45 w-22 h-20 bg-no-repeat bg-contain"></div>
        </template>
        <span class="text-gray-500 max-w-35">
          Կատարվում է տվյալների ներմուծում։
        </span>
      </builder-popup>

      <builder-debts-select-head
        v-if="dropdown"
        :selHead="Acba"
        @renderHead="renderHead"
      ></builder-debts-select-head>

      <builder-changes-modal
        :chagesList="HistoryList"
        @close="showHistory = false"
        v-if="showHistory"
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

      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
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
              <div class="ctx-grid max-w-30">
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 ctx-btn border-bottom"
                  role="button"
                  @click="exportReference"
                >
                  <span class="text-white-100 fs-9">Տեղեկանք</span>
                </li>
                <li
                  class="ls-none py-7 ps-10 bg-pink-350 ctx-btn"
                  role="button"
                  @mouseover="showMenu = true"
                >
                  <span class="text-white-100 fs-9">Պարտավորագիր</span>
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
        <common-button
          ><div class="bg-19 w-12 h-12 bg-contain bg-no-repeat"></div
        ></common-button>
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
import BuilderChangesModal from "@/components/Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "@/components/Builder/BuilderInfoModal.vue";
import CommonAcbaList from "../CommonDebts/CommonAcbaList.vue";
import CommonShow from "../CommonDebts/CommonShow.vue";
import BuilderDebtsSelectHead from "../BuilderDebts/BuilderDebtsSelectHead.vue";
import CommonUpdate from "@/common/CommonUpdate.vue";
import { mapGetters, mapActions } from "vuex";
import BuilderPopup from "@/components/Builder/BuilderPopup.vue";
import CommonModal from "@/common/CommonModal.vue";

export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    CommonAcbaList,
    CommonShow,
    BuilderDebtsSelectHead,
    CommonUpdate,
    BuilderPopup,
    CommonModal,
    VueContext,
  },
  data() {
    return {
      dropdown: false,
      showMenu: false,
      showInfo: false,
      showHistory: false,
      updateData: false,
      loadingPopup: false,
      showRepaymentSchedule: false,
      loadData: true,
      exportFile: null,
      count: 1,
      header: [],
      files: [],
      column: "",
      ascDesc: "",
      srchtxt: "",
    };
  },
  computed: {
    ...mapGetters(["SubDayCase", "HistoryList", "user", "Acba"]),

    LineData: {
      get() {
        return this.SubDayCase;
      },
      set(check) {
        this.SubDayCase.forEach((i) => (i.checked = check));
      },
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
    adminUpdate() {
      return this.user.perm.some((v) => v === "updateSubjectDay");
    },
    adminRemove() {
      return this.user.perm.some((v) => v === "removeInfo");
    },
  },
  methods: {
    ...mapActions([
      "uploadSubjecDay",
      "getSubDayData",
      "sort",
      "exportWord",
      "deleteSubjDayRows",
    ]),

    removeRows() {
      let ids = this.checkedRows.map((v) => v.id);
      this.deleteSubjDayRows(ids);
    },

    sortColm(e, column) {
      this.column = column;
      this.ascDesc = e;
      this.sort({ params: "subject-day", column, ascDesc: e });
    },

    contextMenu(e, item) {
      this.exportFile = item;
      this.$refs.menu.open(e);
    },

    visibilityChanged(isVisible) {
      if (isVisible) {
        this.count++;
        this.loadData = true;
        this.getSubDayData({
          name: "acba",
          id: this.count,
          column: this.column,
          ascDesc: this.ascDesc,
        });
      }
    },
    uploadTableMethod(event) {
      this.loadingPopup = true;
      this.uploadSubjecDay({ newTable: event, header: this.Acba }).then(() => {
        this.loadingPopup = false;
      });
    },
    checkAll(e) {
      this.LineData = e;
    },
    onCheck(event) {
      this.SubDayCase.forEach((i) => {
        if (i.id === event.id) i.checked = event.value;
      });
    },
    exportRepayment() {
      let amount_collected = parseFloat(
        this.exportFile.amount_collected.split(",").join("")
      );
      let PrepaymentAmount = parseInt(this.PrepaymentAmount);
      let formula;
      let filename;
      if (!this.ForgivenessPercent) {
        formula = (amount_collected - PrepaymentAmount) / this.MonthsNum;
        filename = "by_months";
      } else {
        const procent =
          (parseFloat(this.exportFile.fine.split(",").join("")) *
            parseInt(this.ForgivenessPercent)) /
          100;
        formula = amount_collected - procent - PrepaymentAmount;
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
          "&client_address=" +
          this.exportFile.client_address +
          "&loan_start=" +
          this.exportFile.loan_start +
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
          this.exportFile.balance_principal_amount +
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
          this.exportFile.balance_principal_amount +
          "&interest_balance=" +
          this.exportFile.interest_balance +
          "&fine=" +
          this.exportFile.fine +
          "&filename=information_court"
      );
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
    getHistory(id) {
      this.showHistory = true;
    },
    getFile(id) {
      console.log(id);
    },
    getInfo(id) {
      this.showInfo = true;
    },
    renderHead(item) {
      this.header = item;
    },
  },
  watch: {
    SubDayCase() {
      if (this.SubDayCase.length !== 0) {
        this.loadData = false;
      } else this.loadData = false;
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