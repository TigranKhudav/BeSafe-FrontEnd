<template>
  <common-modal>
    <div class="w-full max-w-35">
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
    <template v-slot:sub>Պահպանել</template>
  </common-modal>
</template>
<script>
import CommonInput from "@/common/CommonInput.vue";
import CommonButton from "@/common/CommonButton.vue";
import CommonModal from "@/common/CommonModal.vue";
export default {
  components: { CommonInput, CommonButton, CommonModal },
};
</script>