<template>
  <div class="px-15">
    <common-define-page :notifycations="notifyData"></common-define-page>
    <div
      class="bg-9 w-12 h-12 bg-no-repeat bg-contain my-9"
      role="button"
    ></div>
    <div class="w-full h-80">
      <router-view :Partners="Partners"></router-view>
      <!-- <div class="w-full"></div> -->
      <!-- <keep-alive>
          <component :is="view" class="w-full"></component>
        </keep-alive> -->
    </div>
  </div>
</template>

<script>
import CommonDefinePage from "@/components/CommonDefinePage.vue";
import BuilderPassword from "@/components/Builder/BuilderPassword.vue";
import BuilderMenu from "@/components/Builder/BuilderMenu.vue";
import DebtsModal from "@/components/Debts/DebtsModal.vue";

export default {
  components: {
    CommonDefinePage,
    BuilderPassword,
    BuilderMenu,
    DebtsModal,
  },
  data() {
    return {
      data: { type: Object },
      role: "debts",
      notifyData: [
        { id: 1, name: "ddddd" },
        { id: 2, name: "ddddd" },
        { id: 3, name: "ddddd" },
        { id: 4, name: "ddddd" },
        { id: 5, name: "ddddd" },
        { id: 6, name: "ddddd" },
      ],
      Partners: [
        { id: 1, name: "Acba" },
        { id: 2, name: "UCOM" },
        { id: 3, name: "Global Credit" },
        { id: 4, name: "Good Credit" },
      ],
    };
  },
  created() {
    if (this.role === "debts") {
      this.data = { ...this.lawyer, ...this.debts };
    } //else partqer
  },
};
</script>

<style>
</style>