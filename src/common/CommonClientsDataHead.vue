<template>
  <div class="d-flex align-items-center ms-6" @keyup.enter="searchFunc">
    <div
      v-outside-click="OutsideSearch"
      role="button"
      @click="$emit('sort', 'asc')"
      class="bg-13 w-9 h-9 bg-contain bg-no-repeat"
    ></div>
    <div
      role="button"
      @click="$emit('sort', 'desc')"
      class="bg-14 w-9 h-9 bg-contain bg-no-repeat"
    ></div>
    <div
      @click="searchFunc"
      role="button"
      class="bg-12 w-9 h-9 bg-contain bg-no-repeat me-5"
    ></div>
    <input
      v-if="search"
      ref="input"
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
      this.search = true;
      if (this.search) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
        if (this.searchTxt) {
          return this.$emit("search", this.searchTxt);
        }
      }
    },
    OutsideSearch(e) {
      console.log("gegw");
      let executed = false;
      if (!executed) {
        console.log(e);
        this.searchTxt = "";
        this.search = false;
      }
      executed = true;
    },
  },
};
</script>
<style scoped>
input:focus {
  border-bottom: 2px rgb(163, 28, 48) solid;
}
</style>