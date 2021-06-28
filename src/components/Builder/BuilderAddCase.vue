<template>
  <common-modal @close="$emit('close')">
    <div class="max-w-36">
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
        :placeholder="'Անուն Ազգանուն'"
      ></common-input>
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
        :placeholder="'Անձնագիր'"
      ></common-input>
      <common-input
        :img="'py-11 text-gray-500  text-align-center'"
        :placeholder="'Գործի համար'"
      ></common-input>
      <common-select
        class="py-4 border-bottom"
        :prioritys="prioritys"
        :value="'Կարգավիճակ'"
      ></common-select>
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
        :placeholder="'Վճարված գումար'"
      ></common-input>
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
        :placeholder="'Նիստի օր'"
      ></common-input>
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
        :placeholder="'Դատավոր'"
      ></common-input>
      <common-input
        :img="'py-11 text-gray-500 text-align-center'"
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
  props: { prioritys: { type: Array } },
  components: { CommonModal, CommonInput, CommonSelect },
};
</script>