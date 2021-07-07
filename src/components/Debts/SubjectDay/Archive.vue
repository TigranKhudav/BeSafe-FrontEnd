<template>
  <div class="px-15">
    <div class="mb-10" role="button">
      <router-link :to="{ name: 'Archive' }">
        <span class="fs-10 fw-600 text-gray-400">Արխիվ</span>
      </router-link>
    </div>
    <div>
      <ul class="ps-0">
        <common-archive-button @getMount="getMount">2021</common-archive-button>
        <common-archive-button>2020</common-archive-button>
      </ul>
      <div>
        <div class="days-grid"></div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonArchiveButton from "../CommonDebts/CommonArchiveButton.vue";
export default {
  components: { CommonArchiveButton },
  methods: {
    getMount(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped>
.days-grid {
  display: grid;
}
</style>