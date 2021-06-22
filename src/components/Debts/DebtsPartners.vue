<template>
  <div class="container h-full d-flex align-items-center px-18">
    <div class="d-flex justify-content-between w-full">
      <common-partners
        role="button"
        v-for="item in Partners"
        :key="item.id"
        @click.native="getPart(item.id)"
      >
        {{ item.name }}
      </common-partners>
    </div>
  </div>
</template>

<script>
import CommonPartners from "@/common/CommonPartners.vue";
export default {
  components: { CommonPartners },
  props: { Partners: { type: Array } },
  methods: {
    getPart(id) {
      this.$router.push("partners/" + id);
    },
  },
};
</script>