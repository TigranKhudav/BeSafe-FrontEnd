<template>
  <div class="px-13">
    <common-define-page :notifycations="notifyData"></common-define-page>
    <div
      class="bg-9 w-12 h-12 bg-no-repeat bg-contain my-9"
      role="button"
    ></div>
    <div class="d-flex">
      <div
        v-if="this.$store.state.componentNumber === 0"
        class="w-full max-w-34 position-relative"
      >
        <builder-menu :role="role"></builder-menu>
      </div>
      <div
        class="w-full"
        :class="{
          'top-29 d-flex justify-content-center left-0 right-0 position-absolute z-index-0':
            this.$store.state.componentNumber === 0,
        }"
      >
        <keep-alive>
          <component :is="view" class="w-full"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import CommonDefinePage from "@/components/CommonDefinePage.vue";
import BuilderPassword from "@/components/Builder/BuilderPassword.vue";
import BuilderMenu from "@/components/Builder/BuilderMenu.vue";
import ClientsData from "@/components/ClientsData.vue";
import DataOfCase from "@/components/DataOfCase.vue";
import ListOfSessions from "@/components/ListOfSessions.vue";
import ListOfCourts from "@/components/ListOfCourts.vue";

export default {
  components: {
    CommonDefinePage,
    BuilderPassword,
    BuilderMenu,
    ClientsData,
    DataOfCase,
    ListOfSessions,
    ListOfCourts,
  },
  computed: {
    view() {
      if (this.$store.state.componentNumber === 1) {
        return ClientsData;
      } else if (this.$store.state.componentNumber === 2) {
        return DataOfCase;
      } else if (this.$store.state.componentNumber === 3) {
        return ListOfSessions;
      } else if (this.$store.state.componentNumber === 4) {
        return ListOfCourts;
      } else {
        return BuilderPassword;
      }
    },
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