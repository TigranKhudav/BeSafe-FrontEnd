<template>
  <div class="position-absolute ms-34 mt-15 shadow-1 z-index-1">
    <div class="py-9 px-8 bg-white">
      <div class="d-flex justify-content-end">
        <common-upload-file @file="upload"></common-upload-file>
        <div class="d-flex min-w-33">
          <div class="mx-10" v-if="files.length === 0">
            <span class="fs-11 text-gray-400">Empty</span>
          </div>
          <div v-else class="mx-8" v-for="item in files" :key="item.id"></div>
        </div>
        <div
          @click="$emit('close')"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonUploadFile from "@/common/CommonUploadFile.vue";
export default {
  components: { CommonUploadFile },
  props: { files: { type: Array } },
  methods: {
    upload(files) {
      this.$emit("uploadFile", files);
    },
  },
};
</script>