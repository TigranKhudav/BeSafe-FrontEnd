<template>
  <div class="px-11">
    <common-define-page :notifycations="notifyData"></common-define-page>
    <div
      class="bg-9 w-12 h-12 bg-no-repeat bg-contain my-9"
      role="button"
      @click="$store.state.menu = !$store.state.menu"
    ></div>
    <div class="w-full h-83">
      <router-view :Partners="Partners"></router-view>
    </div>
  </div>
</template>
<script>
import CommonDefinePage from "@/components/CommonDefinePage.vue";
export default {
  components: { CommonDefinePage },
  data() {
    return {
      data: { type: Object },
      role: "admin",
      notifyData: [
        { id: 1, name: "ddddd" },
        { id: 2, name: "ddddd" },
        { id: 3, name: "ddddd" },
        { id: 4, name: "ddddd" },
        { id: 5, name: "ddddd" },
        { id: 6, name: "ddddd" },
      ],
      Partners: [
        { id: 1, name: "Acba" },
        { id: 2, name: "UCOM" },
        { id: 3, name: "Global Credit" },
        { id: 4, name: "Good Credit" },
      ],
    };
  },
};
</script>