<template>
  <div class="modal-mask">
    <div class="py-12 px-16 bg-white">
      <div class="d-flex justify-content-end">
        <button
          @click="$emit('close')"
          type="button"
          class="btn-close outline-none"
          aria-label="Close"
        ></button>
      </div>
      <div class="d-flex w-full">
        <slot name="img" />
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.btn-close:focus {
  outline: none;
  box-shadow: none;
}
</style>