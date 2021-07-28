<template>
  <button
    @click="$emit('click')"
    class="
      border-0
      bg-pink-350
      w-full
      hover
      d-flex
      align-items-center
      justify-content-center
      text-white-100
    "
  >
    <span class="text-white-100">
      <slot class="text-white-100">Ուղարկել</slot>
    </span>
  </button>
</template>
<script>
export default {};
</script>
<style scoped>
.hover:hover {
  background-color: rgb(163, 28, 48);
}
</style>