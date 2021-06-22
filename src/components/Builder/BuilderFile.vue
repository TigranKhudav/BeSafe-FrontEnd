<template>
  <div class="position-absolute top-23 left-33 shadow-1">
    <div class="py-10 px-8 bg-white">
      <div class="d-flex justify-content-end">
        <div class="bg-27 w-12 h-12 bg-contain bg-no-repeat"></div>
        <div class="d-flex min-w-34">
          <div class="mx-10" v-if="files.length === 0">
            <span class="fs-11 text-gray-400">Empty</span>
          </div>
          <div v-else class="mx-8" v-for="item in files" :key="item.id"></div>
        </div>
        <div
          @click="$store.commit(modal, false)"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonModal from "@/common/CommonModal.vue";
export default {
  components: { CommonModal },
  props: { modal: { type: String }, files: { type: Array } },
};
</script>

<style>
</style>