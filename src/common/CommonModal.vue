<template>
  <div class="modal-mask">
    <div class="py-13 px-18 bg-white">
      <div class="d-flex justify-content-end">
        <div
          @click="$store.commit(modal, false)"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
      <slot />
      <common-button class="py-5 mt-12">
        <slot name="sub" />
      </common-button>
    </div>
  </div>
</template>

<script>
import CommonButton from "./CommonButton.vue";
export default {
  components: { CommonButton },
  props: { modal: { type: String } },
};
</script>
