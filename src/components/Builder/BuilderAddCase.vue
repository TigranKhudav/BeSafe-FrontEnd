<template>
  <common-modal @close="$emit('close')">
    <div class="max-w-38 mb-14 mt-7">
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Անուն Ազգանուն'"
      ></common-input>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Անձնագիր'"
      ></common-input>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500  text-align-center'"
        :placeholder="'Գործի համար'"
      ></common-input>
      <common-select
        class="py-2 border-bottom mb-9"
        :Datavalue="Statuses"
        :Size="'max-h-35 max-w-38'"
        :value="'Կարգավիճակ'"
      ></common-select>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Վճարված գումար'"
      ></common-input>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Նիստի օր'"
      ></common-input>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Դատավոր'"
      ></common-input>
      <common-input
        class="mb-9"
        :img="'py-10 text-gray-500 text-align-center'"
        :placeholder="'Նստավայր'"
      ></common-input>
    </div>
  </common-modal>
</template>
<script>
import CommonModal from "@/common/CommonModal.vue";
import CommonInput from "@/common/CommonInput.vue";
import CommonSelect from "@/common/CommonSelect.vue";
export default {
  components: { CommonModal, CommonInput, CommonSelect },
  data() {
    return { Statuses: this.$store.getters.Statuses };
  },
};
</script>