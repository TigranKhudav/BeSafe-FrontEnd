<template>
  <div class="d-flex align-items-center ms-6" v-outside-click="OutsideSearch">
    <div role="button" class="bg-13 w-9 h-9 bg-contain bg-no-repeat"></div>
    <div role="button" class="bg-14 w-9 h-9 bg-contain bg-no-repeat"></div>
    <div
      @click="searchFunc"
      role="button"
      class="bg-12 w-9 h-9 bg-contain bg-no-repeat me-5"
    ></div>
    <input
      v-if="search"
      class="
        w-full
        border-0 border-bottom
        h-12
        outline-none
        ps-6
        py-2
        text-gray-500
      "
      type="text"
      v-model.trim="searchTxt"
    />
    <div v-else="search" class="ms-4 text-start">
      <span class="fs-7 text-gray-600"><slot /></span>
    </div>
  </div>
</template>
<script>
import CommonInput from "./CommonInput.vue";
export default {
  components: { CommonInput },
  data() {
    return {
      search: false,
      searchTxt: "",
    };
  },
  methods: {
    searchFunc() {
      if (this.search) {
        this.$emit("search", this.searchTxt);
        return;
      }
      this.search = true;
    },
    OutsideSearch() {
      this.searchTxt = "";
      this.search = false;
    },
  },
};
</script>
<style scoped>
input:focus {
  border-bottom: 2px rgb(163, 28, 48) solid;
}
</style>