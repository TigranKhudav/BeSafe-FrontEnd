<template>
  <div class="modal-mask">
    <div class="py-12 px-16 bg-white-100">
      <div class="d-flex justify-content-end">
        <button
          @click="$emit('close')"
          type="button"
          class="btn-close outline-none"
          aria-label="Close"
        ></button>
      </div>
      <slot />
      <common-button @click="$emit('send')" class="py-5 mt-12">
        <slot name="sub" />
      </common-button>
    </div>
  </div>
</template>
<script>
import CommonButton from "./CommonButton.vue";
export default { components: { CommonButton } };
</script>