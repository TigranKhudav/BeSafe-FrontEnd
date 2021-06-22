<template>
  <common-modal :modal="'addSessionModal'">
    <div class="max-w-36">
      <common-input
        :img="'py-13 text-gray-500 text-align-center'"
        :placeholder="'Նիստի ամսաթիվ'"
      ></common-input>
      <common-input
        :img="'py-13 text-gray-500 text-align-center'"
        :placeholder="'Ժամ'"
      ></common-input>
      <common-input
        :img="'py-13 text-gray-500 text-align-center'"
        :placeholder="'Դատավորի անուն ազգանուն'"
      ></common-input>
      <common-input
        :img="'py-13 text-gray-500 text-align-center'"
        :placeholder="'Նստավայր'"
      ></common-input>
    </div>
    <template v-slot:submit></template>
  </common-modal>
</template>
<script>
import CommonModal from "@/common/CommonModal.vue";
import CommonInput from "@/common/CommonInput.vue";
export default {
  components: { CommonModal, CommonInput },
};
</script>