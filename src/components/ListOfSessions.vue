<template>
  <div>
    <common-button
      @click.native="$store.commit('addSessionModal', true)"
      class="position-absolute top-23 right-22 w-full max-w-28"
    >
      <div class="d-flex align-items-center p-4">
        <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
        <span> Ավելացնել</span>
      </div>
    </common-button>
    <!-- Modals -->
    <!-- :modal="'upcoming'" -->
    <transition name="fade">
      <builder-upcoming-sessions
        v-if="UpcomingSessions.length"
        :UpComSes="UpcomingSessions"
      ></builder-upcoming-sessions>
    </transition>

    <transition name="fade">
      <builder-add-session
        v-if="$store.state.showAddSession"
      ></builder-add-session>
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
            <common-clients-data-head>Նիստի ամսաթիվ </common-clients-data-head>
            <common-clients-data-head>Ժամ</common-clients-data-head>
            <common-clients-data-head>
              Դատավորի անուն ազգանուն
            </common-clients-data-head>
            <common-clients-data-head>Նստավայր</common-clients-data-head>
          </div>
          <div class="overflow-hidden">
            <common-sesion-list
              v-for="item in SessionData"
              :key="item.id"
              :data="item"
              @history="getHistory"
              @info="getInfo"
            ></common-sesion-list>
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
import CommonButton from "../common/CommonButton.vue";
import CommonCheckbox from "../common/CommonCheckbox.vue";
import CommonClientsDataHead from "../common/CommonClientsDataHead.vue";
import BuilderChangesModal from "./Builder/BuilderChangesModal.vue";
import BuilderInfoModal from "./Builder/BuilderInfoModal.vue";
import CommonSesionList from "@/common/CommonSesionList.vue";
import BuilderAddSession from "./Builder/BuilderAddSession.vue";
import BuilderUpcomingSessions from "./Builder/BuilderUpcomingSessions.vue";
export default {
  components: {
    CommonCheckbox,
    CommonClientsDataHead,
    CommonButton,
    BuilderChangesModal,
    BuilderInfoModal,
    CommonSesionList,
    BuilderAddSession,
    BuilderUpcomingSessions,
  },
  data() {
    return {
      SessionData: [
        {
          id: 1,
          checked: false,
          sessionDate: "11.06.21",
          sessionHour: "18։00",
          judgeName: "Գագիկ Հայրապետյան  Գուրգենի",
          residence: "Lorem Ipsum",
        },
      ],
      UpcomingSessions: [
        {
          id: 1,
          checked: false,
          sessionDate: "11.06.21",
          sessionHour: "18։00",
          judgeName: "Գագիկ Հայրապետյան  Գուրգենի",
          residence: "Lorem Ipsum",
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
      this.SessionData.forEach((i) => (i.checked = e.target.checked));
    },
    getHistory(id) {
      console.log(id);
      this.$store.commit("historyModal", true);
    },
    getInfo(id) {
      this.$store.commit("getInfoModal", true);
    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 4fr 2fr 4fr 4fr;
}
</style>