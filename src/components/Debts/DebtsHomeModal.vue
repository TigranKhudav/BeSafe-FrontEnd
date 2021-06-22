<template>
  <div class="d-flex">
    <div class="w-full max-w-34">
      <builder-menu :selects="role"></builder-menu>
    </div>
    <div class="d-flex w-full justify-content-center">
      <debts-modal :Partners="Partners"></debts-modal>
    </div>
  </div>
</template>

<script>
import BuilderMenu from "../Builder/BuilderMenu.vue";
import DebtsModal from "./DebtsModal.vue";
export default {
  components: { BuilderMenu, DebtsModal },
  props: { Partners: { type: Array } },
};
</script>

<style>
</style>