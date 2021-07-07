<template>
  <div class="pt-25">
    <div class="mb-25 d-flex w-full justify-content-center">
      <div v-if="admin" class="d-flex" role="button">
        <div class="bg-42 w-11 h-11 bg-no-repeat bg-contain"></div>
        <span class="text-pink-350 ms-6">Ավելացնել գործընկեր</span>
      </div>
    </div>
    <div class="container d-flex flex-dir-column align-items-center px-18">
      <div class="d-flex justify-content-between w-full">
        <button
          role="button"
          v-for="item in Partners"
          :key="item.id"
          @click="getPart(item.id)"
          class="bg-part rounded-8 w-full max-w-24 py-13 border-0"
        >
          <span class="fs-10 fw-600 text-white">{{ item.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { Partners: { type: Array } },
  computed: {
    admin() {
      return this.$store.getters.userperm.some((v) => v === "addPartners");
    },
  },
  methods: {
    getPart(id) {
      console.log(this.$router.currentRoute);
      // this.$router.push("partners/" + id);
    },
  },
};
</script>