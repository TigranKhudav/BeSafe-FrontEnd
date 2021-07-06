<template>
  <common-main-page>
    <div class="max-w-35">
      <div class="d-flex justify-content-center">
        <div class="w-24 h-24 bg-11 bg-no-repeat bg-contain"></div>
      </div>
      <div class="d-flex justify-content-center my-7">
        <span class="fs-10 text-pink-350">Անձնական էջ</span>
      </div>
      <div>
        <common-input
          class="my-8"
          :placeholder="'Նոր գաղտնաբառը'"
          :class="'text-align-center'"
          @onInput="newPass = $event"
        ></common-input>
        <common-input
          class="my-8"
          :placeholder="'Կրկնել գաղտնաբառը'"
          :class="'text-align-center'"
          @onInput="confirmPass = $event"
        ></common-input>
        <common-button @click="changePass" class="mt-9 h-16">
          Հաստատել
        </common-button>
      </div>
    </div>
  </common-main-page>
</template>
<script>
import CommonInput from "@/common/CommonInput.vue";
import CommonButton from "@/common/CommonButton.vue";
import CommonMainPage from "@/common/CommonMainPage.vue";
export default {
  components: { CommonInput, CommonButton, CommonMainPage },
  data() {
    return {
      newPass: "",
      confirmPass: "",
    };
  },
  methods: {
    changePass() {
      if (this.newPass === this.confirmPass) {
        console.log(this.newPass, this.confirmPass);
      }
    },
  },
};
</script>