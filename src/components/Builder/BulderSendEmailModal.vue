<template>
  <common-modal @close="$emit('close')" @send="sendEmail">
    <div class="max-w-36 mt-10">
      <div class="my-14 border-bottom d-flex justify-content-center">
        <span>{{ clientData.name }}</span>
      </div>
      <common-input
        :class="'text-align-center'"
        :img="'bg-26'"
        :value="clientData.email"
        @onInput="email = $event"
        class="mb-14"
      ></common-input>
      <textarea
        class="w-full min-h-30 max-h-36 resize-none"
        v-model="textareaData"
      ></textarea>
      <div class="d-flex justify-content-between ps-10 my-10">
        <div class="d-flex align-items-center">
          <common-upload-file @file="sendUploadFile"></common-upload-file>
          <i class="text-gray-500 ms-7">{{ text }}</i>
        </div>
        <div class="d-flex">
          <div class="bg-28 w-11 h-11 bg-contain bg-no-repeat"></div>
          <div class="bg-30 w-11 h-11 bg-contain bg-no-repeat mx-8"></div>
          <div class="bg-29 w-11 h-11 bg-contain bg-no-repeat"></div>
        </div>
      </div>
    </div>
  </common-modal>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonInput from "@/common/CommonInput.vue";
import CommonModal from "@/common/CommonModal.vue";
import CommonUploadFile from "@/common/CommonUploadFile.vue";
export default {
  components: { CommonInput, CommonButton, CommonModal, CommonUploadFile },
  props: { clientData: { type: Object } },
  data() {
    return {
      textareaData: "",
      text: "",
      email: this.clientData.email,
      files: null,
    };
  },
  methods: {
    sendEmail() {
      let emailData = {
        email: this.email,
        name: this.clientData.name,
        text: this.textareaData,
        files: this.files,
      };
      this.$emit("sendEmail", emailData);
    },
    sendUploadFile(event) {
      this.files = event;
      if (event.length > 1) {
        this.text = `${event.length} files selected.`;
      } else this.text = event[0].name;
    },
  },
};
</script>