<template>
  <div>
    <common-button
      @click="showModal = true"
      class="position-absolute top-vm1 right-21 w-full max-w-32"
    >
      <div class="d-flex align-items-center p-4">
        <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
        <span>Ներմուծել հաճախորդ</span>
      </div>
    </common-button>
    <!-- Modals -->

    <!-- Add Client -->
    <transition name="fade">
      <common-modal v-if="showModal" @close="showModal = false">
        <div class="w-full max-w-35">
          <common-input
            class="my-10"
            :class="'text-align-center'"
            :img="'bg-24'"
            :placeholder="'Անուն Ազգանուն'"
          ></common-input>
          <common-input
            :class="'text-align-center'"
            class="my-10"
            :img="'bg-23'"
            :placeholder="'Հեռախոսահամար'"
          ></common-input>
          <common-input
            class="my-10"
            :class="'text-align-center'"
            :img="'bg-22'"
            :placeholder="'Էլ, հասցե'"
          ></common-input>
          <common-input
            :class="'text-align-center'"
            class="my-10"
            :img="'bg-21'"
            :placeholder="'Ծննդյան ամսաթիվ'"
          ></common-input>
        </div>
        <template v-slot:sub>Պահպանել</template>
      </common-modal>
    </transition>

    <transition name="fade">
      <builder-changes-modal
        @close="showHistory = false"
        :chagesList="HistoryList"
        v-if="showHistory"
      ></builder-changes-modal>
    </transition>

    <transition name="fade">
      <bulder-send-email-modal
        v-if="showSendEmail"
        @close="showSendEmail = false"
        :clientData="sendEmailData"
      ></bulder-send-email-modal>
    </transition>

    <transition name="fade">
      <builder-info-modal
        @close="showInfo = false"
        v-if="showInfo"
      ></builder-info-modal>
    </transition>

    <div class="d-flex justify-content-center w-full h-83 mt-13">
      <div class="d-flex h-full w-full">
        <div class="w-full overflow-x-auto">
          <div class="grid mb-3">
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
          <common-client-data-list
            :data="item"
            v-for="item in clientsData"
            :key="item.id"
            @history="getHistory"
            @info="getInfo"
            @email="sendEmail"
          ></common-client-data-list>
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
import CommonInput from "@/common/CommonInput.vue";
import CommonModal from "@/common/CommonModal.vue";
import CommonClientDataList from "@/common/CommonClientDataList.vue";
import CommonClientsDataHead from "@/common/CommonClientsDataHead.vue";
import BuilderChangesModal from "../Builder/BuilderChangesModal.vue";
import BulderSendEmailModal from "../Builder/BulderSendEmailModal.vue";
import BuilderInfoModal from "../Builder/BuilderInfoModal.vue";
export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    CommonClientDataList,
    BuilderChangesModal,
    BulderSendEmailModal,
    BuilderInfoModal,
    CommonModal,
    CommonInput,
  },
  data() {
    return {
      showModal: false,
      showHistory: false,
      showSendEmail: false,
      showInfo: false,
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
      this.showHistory = true;
    },
    getInfo(id) {
      this.showInfo = true;
    },
    sendEmail(userInfo) {
      this.showSendEmail = true;
      this.sendEmailData.name = userInfo.name;
      this.sendEmailData.email = userInfo.email;
    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 6fr 6fr 3fr 3fr 1fr 1fr;
}
</style>