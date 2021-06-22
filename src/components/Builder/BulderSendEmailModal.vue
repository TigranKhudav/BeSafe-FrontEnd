<template>
  <div class="modal-mask">
    <div class="py-13 px-18 bg-white">
      <div class="d-flex justify-content-end">
        <div
          @click="$store.commit('sendEmailModal', false)"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
      <div class="max-w-36 mt-10">
        <div class="my-14 border-bottom d-flex justify-content-center">
          <span>{{ clientData.name }}</span>
        </div>
        <common-input
          :class="'text-align-center'"
          :img="'bg-26'"
          :value="clientData.email"
          class="mb-14"
        ></common-input>
        <textarea class="w-full min-h-30 max-h-36" name="" id=""></textarea>
        <div class="d-flex justify-content-between ps-10 my-10">
          <div class="bg-27 w-11 h-11 bg-contain bg-no-repeat"></div>
          <div class="d-flex">
            <div class="bg-28 w-11 h-11 bg-contain bg-no-repeat"></div>
            <div class="bg-30 w-11 h-11 bg-contain bg-no-repeat mx-8"></div>
            <div class="bg-29 w-11 h-11 bg-contain bg-no-repeat"></div>
          </div>
        </div>
        <common-button class="p-8">Ուղարկել</common-button>
      </div>
    </div>
  </div>
</template>

<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonInput from "@/common/CommonInput.vue";
export default {
  components: { CommonInput, CommonButton },
  props: {
    clientData: { type: Object },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>