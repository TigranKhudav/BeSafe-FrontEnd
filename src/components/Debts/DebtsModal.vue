<template>
  <div class="d-flex justify-content-center">
    <div class="w-full max-w-36">
      <!-- stor partners -->
      <common-select class="mt-20" :Datavalue="part"
        >Կազմակերպություն</common-select
      >
      <common-input
        class="text-align-center my-9"
        :placeholder="'Անուն Ազգանուն'"
      ></common-input>
      <common-input
        class="text-align-center my-9"
        :placeholder="'Անձնագիր'"
      ></common-input>
      <common-select class="my-9">Կարգավիճակ</common-select>
      <common-input
        class="text-align-center my-9"
        :placeholder="'Ժամանակահատված'"
      ></common-input>
      <common-button class="py-4 mt-10"
        ><div>
          <div class="bg-"></div>
          <span>Փնտրել</span>
        </div></common-button
      >
    </div>
  </div>
</template>

<script>
import CommonInput from "@/common/CommonInput.vue";
import CommonSelect from "@/common/CommonSelect.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonSelect, CommonInput, CommonButton },
};
</script>