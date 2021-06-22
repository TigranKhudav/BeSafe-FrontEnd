<template>
  <div class="container d-flex align-items-center justify-content-center h-100">
    <builder-login-modal class="max-w-35"></builder-login-modal>
  </div>
</template>

<script>
import BuilderLoginModal from "@/components/Builder/BuilderLoginModal.vue";
export default {
  components: { BuilderLoginModal },
};
</script>