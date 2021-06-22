<template>
  <div class="w-full mb-25">
    <div class="bg-1 w-23 h-23 bg-contain"></div>
    <div class="mb-20">
      <input
        class="
          w-full
          border-0 border-bottom
          h-14
          outline-none
          ps-14
          py-10
          plac
          bg-2 bg-no-repeat
        "
        type="text"
        placeholder="Մուտքանուն"
      />
    </div>
    <div class="my-14">
      <common-input :placeholder="'Գաղտնաբառ'"></common-input>
    </div>
    <common-button class="w-full p-6">Մուտք Գործել</common-button>
  </div>
</template>

<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonInput from "@/common/CommonInput.vue";
export default {
  components: { CommonButton, CommonInput },
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