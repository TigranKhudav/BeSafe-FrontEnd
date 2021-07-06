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
    "
  >
    <span class="text-white fs-sm-18"><slot>Ուղարկել</slot></span>
  </button>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.hover:hover {
  background-color: rgb(163, 28, 48);
}
</style>