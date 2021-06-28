<template>
  <div>
    <common-button
      @click.native="showModal = true"
      class="position-absolute top-23 right-22 w-full max-w-28"
    >
      <div class="d-flex align-items-center p-4">
        <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
        <span>Ներմուծել հաճախորդ</span>
      </div>
    </common-button>
    <!-- Modals -->
    <transition name="fade">
      <builder-add-client-modal v-if="showModal"></builder-add-client-modal>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        :chagesList="HistoryList"
        v-if="$store.state.showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <bulder-send-email-modal
        v-if="$store.state.showSendEmail"
        :clientData="sendEmailData"
      ></bulder-send-email-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal v-if="$store.state.showInfo"></builder-info-modal>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-12">
      <div class="d-flex h-full w-full">
        <div class="w-full">
          <div class="grid mb-8">
            <div class="d-flex justify-content-center align-items-center">
              <common-checkbox @change.native="check($event)">
              </common-checkbox>
            </div>
            <div></div>
            <common-clients-data-head>Անուն Ազգանուն</common-clients-data-head>
            <common-clients-data-head>Հեռախոսահամար</common-clients-data-head>
            <common-clients-data-head>Էլ հասցե</common-clients-data-head>
            <common-clients-data-head>Ծննդյան թիվ</common-clients-data-head>
            <common-clients-data-head>Ամսաթիվ</common-clients-data-head>
          </div>
          <div class="overflow-hidden">
            <common-client-data-list
              :data="item"
              v-for="item in clientsData"
              :key="item.id"
              @history="getHistory"
              @info="getInfo"
              @email="sendEmail"
            ></common-client-data-list>
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
import CommonButton from "../../common/CommonButton.vue";
import CommonCheckbox from "../../common/CommonCheckbox.vue";
import CommonClientDataList from "../../common/CommonClientDataList.vue";
import CommonClientsDataHead from "../../common/CommonClientsDataHead.vue";
import BuilderAddClientModal from "../Builder/BuilderAddClientModal.vue";
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BulderSendEmailModal from "../Builder/BulderSendEmailModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderAddClientModal,
    CommonClientDataList,
    BuilderChangesModal,
    BulderSendEmailModal,
    BuilderInfoModal,
  },
  data() {
    return {
      showModal: false,
      showHistory: false,
      sendEmailData: {
        name: "",
        email: "",
      },
      clientsData: [
        {
          id: 1,
          checked: false,
          info: "",
          name: "Մուսաելյան Արսեն Ալյոշայի",
          phone: "055 32 64 85",
          email: "Arsen877@gmail.com",
          birthday: "18.06.92",
          date: "11.06.21",
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
    };
  },
  methods: {
    check(e) {
      this.clientsData.forEach((client) => (client.checked = e.target.checked));
    },
    getHistory(id) {
      console.log(id);
      this.$store.commit("historyModal", true);
    },
    getInfo(id) {
      this.$store.commit("getInfoModal", true);
    },
    sendEmail(id) {
      console.log(id);
      this.clientsData.map((v) => {
        if (v.id === id) {
          this.sendEmailData.name = v.name;
          this.sendEmailData.email = v.email;
        }
      });
      this.$store.commit("sendEmailModal", true);
    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 3fr 3fr 2fr 2fr 1fr 1fr;
}
</style>