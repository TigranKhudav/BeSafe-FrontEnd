<template>
  <div
    class="d-flex position-absolute p-8 bg-white-100 top-22 left-21 shadow-1"
  >
    <div class="bg-31 w-18 h-18 bg-contain bg-no-repeat"></div>
    <div class="min-w-35 w-full mx-6" @click="editInfo = true">
      <input
        class="w-full h-full"
        v-if="editInfo"
        type="text"
        :value="infoData"
      />
      <span v-else>{{ infoData }}</span>
    </div>
    <button
      @click="$emit('close')"
      type="button"
      class="btn-close outline-none"
      aria-label="Close"
    ></button>
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