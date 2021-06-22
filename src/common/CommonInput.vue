<template>
  <input
    class="
      w-full
      border-0 border-bottom
      h-14
      outline-none
      bg-no-repeat
      ps-14
      py-10
      plac
    "
    type="text"
    :value="value"
    :placeholder="placeholder"
    :class="img ? img : 'bg-3'"
    @input="$emit('on-input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    placeholder: { type: String },
    img: { type: String },
    value: { type: String },
  },
};
</script>

<style scoped>
input:focus {
  border-bottom: 2px rgb(163, 28, 48) solid;
}
</style>