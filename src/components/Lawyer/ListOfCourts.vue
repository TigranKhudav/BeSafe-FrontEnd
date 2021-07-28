<template>
  <div class="px-22">
    <div>
      <div class="position-absolute left-23 top-22">
        <h3 class="fs-12 text-gray-500">Դատարանների ցանկ</h3>
      </div>
      <div class="px-8 mt-15 max-h-39 overflow-y-scroll">
        <div
          class="w-full py-6 px-18 bg-gray-100 my-11"
          v-for="item in CourtsList"
          :key="item.id"
        >
          <div class="d-flex mb-4">
            <span class="me-27 text-gray-600 fs-10">{{ item.region }}</span>
            <p class="text-gray-500 fs-10 mb-0">{{ item.court }}</p>
          </div>
          <div class="row">
            <div class="col-7"></div>
            <div class="col-5">
              <span class="text-pink-350 fs-10">{{ item.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    CourtsList() {
      return this.$store.getters.CourtsList;
    },
  },
};
</script>