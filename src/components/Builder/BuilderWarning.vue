<template>
  <div
    class="
      d-flex
      position-absolute
      py-10
      px-10
      bg-white
      top-22
      left-30
      shadow-1
    "
  >
    <div class="bg-33 w-18 h-18 bg-contain bg-no-repeat"></div>
    <div class="min-w-36 w-full mx-6">
      <span>Գործողությունը չի կատարվել</span>
    </div>
    <div
      @click="$store.commit('getInfoModal', false)"
      role="button"
      class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
    ></div>
  </div>
</template>
<script>
export default {};
ewfewfwew;
</script>