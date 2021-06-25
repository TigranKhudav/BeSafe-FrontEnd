<template>
  <div class="d-flex">
    <builder-menu :role="role"></builder-menu>
    <div class="d-flex w-full justify-content-center">
      <slot />
    </div>
  </div>
</template>
<script>
import BuilderMenu from "../components/Builder/BuilderMenu.vue";
export default {
  components: { BuilderMenu },
  props: { role: { type: String } },
};
</script>