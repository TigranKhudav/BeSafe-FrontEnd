<template>
  <div class="w-full mb-25">
    <div class="bg-1 w-23 h-23 bg-contain"></div>
    <div class="mb-20">
      <common-input
        @on-input="getLogin"
        :img="'bg-2'"
        :placeholder="'Մուտքանուն'"
      ></common-input>
    </div>
    <div class="my-14">
      <common-input
        @on-input="getPass"
        :placeholder="'Գաղտնաբառ'"
      ></common-input>
    </div>
    <common-button class="w-full p-6">Մուտք Գործել</common-button>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonInput from "@/common/CommonInput.vue";
export default {
  components: { CommonButton, CommonInput },
  methods: {
    getLogin(value) {
      console.log(value);
    },
    getPass(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped lang="scss">
.plac {
  background-size: 1.5rem 1.5rem;
  background-position: left center;
  &::placeholder {
    color: gray;
    font-size: 0.9rem;
  }
}
</style>