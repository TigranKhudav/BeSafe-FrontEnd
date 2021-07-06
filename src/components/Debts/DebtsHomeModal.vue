<template>
  <common-main-page>
    <div class="d-flex justify-content-center">
      <div class="w-full max-w-36">
        <common-select
          class="mt-20 mb-11 border-bottom"
          :Datavalue="Partners"
          :Size="'max-h-26'"
          :value="'Կազմակերպություն'"
          :padding="'py-1'"
        >
        </common-select>
        <common-input
          :img="'bg-24 text-gray-500'"
          class="text-align-center mb-11 bg-p-8"
          :placeholder="'Անուն Ազգանուն'"
        ></common-input>
        <common-input
          :img="'bg-37 text-gray-500'"
          class="text-align-center mb-11 bg-p-8"
          :placeholder="'Անձնագիր'"
        ></common-input>
        <common-select
          class="mb-11 border-bottom"
          :value="'Կարգավիճակ'"
          :padding="'pb-3 ps-7'"
          :img="'bg-36'"
        ></common-select>
        <common-input
          :img="'bg-21 text-gray-500'"
          class="text-align-center mb-12 bg-p-8"
          :placeholder="'Ժամանակահատված'"
        ></common-input>
        <common-button class="py-5 mt-10">
          <div class="d-flex">
            <div class="bg-35 bg-no-repeat w-11 h-11 bg-contain me-6"></div>
            <span>Փնտրել</span>
          </div>
        </common-button>
      </div>
    </div>
  </common-main-page>
</template>
<script>
import CommonMainPage from "@/common/CommonMainPage.vue";
import CommonInput from "@/common/CommonInput.vue";
import CommonSelect from "@/common/CommonSelect.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonMainPage, CommonSelect, CommonInput, CommonButton },
  props: { Partners: { type: Array } },
};
</script>