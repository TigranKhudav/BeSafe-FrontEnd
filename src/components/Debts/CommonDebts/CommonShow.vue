<template>
  <common-button
    class="right-22 w-full max-w-28 position-absolute top-22 z-index-0"
  >
    <div class="d-flex align-items-center justify-content-center p-3">
      <span class="fs-9">Ցուցադրել</span>
      <div
        class="w-9 h-9 bg-no-repeat bg-contain mx-9 mt-5"
        :class="dropdown ? 'bg-6' : 'bg-5'"
      ></div>
    </div>
  </common-button>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonButton },
  props: { dropdown: { type: Boolean } },
};
</script>