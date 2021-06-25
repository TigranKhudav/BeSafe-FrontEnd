<template>
  <common-main-page :role="'debts'">
    <debts-modal></debts-modal>
  </common-main-page>
</template>

<script>
import CommonMainPage from "@/common/CommonMainPage.vue";
import DebtsModal from "./DebtsModal.vue";
export default {
  components: { CommonMainPage, DebtsModal },
};
</script>