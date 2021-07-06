<template>
  <div class="container h-full d-flex align-items-center px-18">
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
</template>
<script>
export default {
  props: { Partners: { type: Array } },
  methods: {
    getPart(id) {
      console.log(this.$router.currentRoute);
      // this.$router.push("partners/" + id);
    },
  },
};
</script>