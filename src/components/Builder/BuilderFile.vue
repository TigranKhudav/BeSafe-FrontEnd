<template>
  <div class="position-absolute ms-34 mt-15 shadow-1 z-index-1">
    <div class="py-9 px-8 bg-white-100">
      <div class="d-flex justify-content-end">
        <common-upload-file @file="$emit('uploadFile', $event)">
        </common-upload-file>
        <div class="d-flex min-w-33">
          <div class="mx-10" v-if="files.length === 0">
            <span class="fs-11 text-gray-400">Empty</span>
          </div>
          <div v-else class="mx-8" v-for="item in files" :key="item.id"></div>
        </div>
        <button
          @click="$emit('close')"
          type="button"
          class="btn-close outline-none"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import CommonUploadFile from "@/common/CommonUploadFile.vue";
export default {
  components: { CommonUploadFile },
  props: { files: { type: Array } },
};
</script>