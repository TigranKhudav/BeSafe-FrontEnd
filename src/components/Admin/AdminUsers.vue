<template>
  <common-main-page class="mt-10" :role="'admin'">
    <common-button
      @click.native="$store.commit('addSessionModal', true)"
      class="position-absolute top-22 right-22 w-full max-w-30 rounded-16"
    >
      <div class="p-4 d-flex">
        <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
        <span>Ավելացնել oգտագործող</span>
      </div>
    </common-button>
    <builder-admin-users :Users="Users"></builder-admin-users>
  </common-main-page>
</template>
<script>
import CommonMainPage from "@/common/CommonMainPage.vue";
import BuilderAdminUsers from "./Builder/BuilderAdminUsers.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonMainPage, BuilderAdminUsers, CommonButton },
  data() {
    return {
      Users: [
        {
          id: 1,
          name: "Anushavagyan",
        },
        {
          id: 2,
          name: "Bnushavagyan",
        },
        {
          id: 3,
          name: "banushavagyan",
        },
      ],
    };
  },
};
</script>