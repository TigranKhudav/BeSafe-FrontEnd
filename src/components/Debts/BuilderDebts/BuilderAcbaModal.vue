<template>
  <common-modal>
    <div>
      <div class="row my-12">
        <div class="col px-0 me-10">
          <span class="text-gray-500 fs-8">Ամիսների քանակ</span>
        </div>
        <div class="col px-0">
          <input class="max-w-25" type="text" />
        </div>
      </div>
      <div class="row my-12">
        <div class="col px-0 me-10">
          <span class="text-gray-500 fs-8">Ներման տոկոս</span>
        </div>
        <div class="col px-0">
          <input class="max-w-25" type="text" />
        </div>
      </div>
      <div class="row my-12">
        <div class="col px-0 me-10">
          <span class="text-gray-500 fs-8">Կանխավճարի չափ</span>
        </div>
        <div class="col px-0">
          <input class="max-w-25" type="text" />
        </div>
      </div>
    </div>
    <template v-slot:sub> Արտահանել </template>
  </common-modal>
</template>

<script>
import CommonModal from "@/common/CommonModal.vue";
export default {
  components: { CommonModal },
};
</script>

<style>
</style>