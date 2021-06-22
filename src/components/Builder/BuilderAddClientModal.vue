<template>
  <div class="modal-mask">
    <div class="py-10 px-15 max-w-36 bg-white">
      <div>
        <common-input
          class="my-10"
          :class="'text-align-center'"
          :img="'bg-24'"
          :placeholder="'Անուն Ազգանուն'"
        ></common-input>
        <common-input
          :class="'text-align-center'"
          class="my-10"
          :img="'bg-23'"
          :placeholder="'Հեռախոսահամար'"
        ></common-input>
        <common-input
          class="my-10"
          :class="'text-align-center'"
          :img="'bg-22'"
          :placeholder="'Էլ, հասցե'"
        ></common-input>
        <common-input
          :class="'text-align-center'"
          class="my-10"
          :img="'bg-21'"
          :placeholder="'Ծննդյան ամսաթիվ'"
        ></common-input>
      </div>
      <common-button class="py-5 my-7">Պահպանել</common-button>
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