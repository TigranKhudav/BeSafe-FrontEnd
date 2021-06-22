<template>
  <div class="max-w-35">
    <div class="d-flex justify-content-center">
      <div class="w-24 h-24 bg-11 bg-no-repeat bg-contain"></div>
    </div>
    <div class="d-flex justify-content-center my-6">
      <span class="fs-10 text-pink-350">Անձնական էջ</span>
    </div>
    <div>
      <common-input
        class="my-7"
        :placeholder="'Նոր գաղտնաբառը'"
        :class="'text-align-center'"
      ></common-input>
      <common-input
        class="my-7"
        :placeholder="'Կրկնել գաղտնաբառը'"
        :class="'text-align-center'"
      ></common-input>
      <common-button class="my-7 h-16">Հաստատել</common-button>
    </div>
  </div>
</template>

<script>
import CommonInput from "@/common/CommonInput.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonInput, CommonButton },
};
</script>

<style>
</style>