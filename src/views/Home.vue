<template>
  <common-define-page>
    <div class="d-flex justify-content-center align-items-center h-80">
      <div class="max-w-35">
        <common-button class="h-15 my-10">Փաստաբանական բաժին</common-button>
        <common-button class="h-15">Պարտքերի հավաքագրման բաժին</common-button>
      </div>
    </div>
  </common-define-page>
</template>

<script>
import CommonDefinePage from "@/components/CommonDefinePage.vue";
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonDefinePage, CommonButton },
};
</script>

<style>
</style>