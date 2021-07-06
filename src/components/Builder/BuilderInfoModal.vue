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
    <div class="bg-31 w-18 h-18 bg-contain bg-no-repeat"></div>
    <div class="min-w-36 w-full mx-6" @click="editInfo = true">
      <input
        class="w-full h-full"
        v-if="editInfo"
        type="text"
        :value="infoData"
      />
      <span v-else>{{ infoData }}</span>
    </div>
    <div
      @click="$emit('close')"
      role="button"
      class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
    ></div>
  </div>
</template>
<script>
export default {
  props: { infoData: { type: String } },
  data() {
    return {
      editInfo: false,
    };
  },
};
</script>