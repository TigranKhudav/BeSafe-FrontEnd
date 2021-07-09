<template>
  <input
    class="w-11 h-11 outline-none"
    role="button"
    type="checkbox"
    :value="value"
    :checked="value"
    @change="$emit('check', $event.target.checked)"
  />
</template>
<script>
export default {
  props: { value: { type: Boolean } },
};
</script>
<style scoped>
input {
  border: 1px solid rgb(163, 28, 48);
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
}
input:checked {
  background: rgb(163, 28, 48);
}
</style>