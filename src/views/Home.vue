<template>
  <div class="px-11">
    <common-define-page></common-define-page>
    <div
      class="bg-9 w-12 h-12 bg-no-repeat bg-contain mt-10"
      role="button"
      @click="$store.state.menu = !$store.state.menu"
    ></div>
    <div class="w-full h-83">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import CommonDefinePage from "@/components/CommonDefinePage.vue";
export default {
  components: { CommonDefinePage },
};
</script>