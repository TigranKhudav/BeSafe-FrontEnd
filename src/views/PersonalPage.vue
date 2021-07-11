<template>
  <div class="d-flex">
    <div class="d-flex w-full justify-content-center mt-25">
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
        <transition name="fade">
          <div class="d-flex justify-content-center mt-5" v-if="err">
            <p class="text-red-600">Գաղտնաբառերը չեն համընկնում !</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import CommonInput from "@/common/CommonInput.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonInput, CommonButton },
  data() {
    return {
      newPass: "",
      confirmPass: "",
      err: false,
    };
  },
  methods: {
    changePass() {
      if (this.newPass === this.confirmPass) {
        let user = this.$store.getters.user;
        let data = { id: user.id, name: user.name, newPass: this.newPass };
        this.$store.dispatch("changePass", data);
      } else {
        this.err = true;
      }
    },
  },
};
</script>