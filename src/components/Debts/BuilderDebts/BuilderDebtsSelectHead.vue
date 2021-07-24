<template>
  <div
    class="
      position-absolute
      z-index-1
      bg-white-100
      shadow-1
      top-24
      w-full
      max-w-36
      right-21
    "
  >
    <ul class="px-5 pt-5 overflow-y-scroll max-h-36">
      <li
        role="button"
        class="ls-none ps-6 py-3 my-3"
        v-for="item in selHead"
        :key="item.id"
        :class="item.checked && 'bg-blue-200'"
        @click="hihi(item)"
      >
        <input
          type="checkbox"
          class="d-none"
          :checked="item.checked"
          :value="item.checked"
        />
        <span class="text-gray-500 fs-8">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: { selHead: { type: Array, required: true } },
  computed: {
    renderHead() {
      return this.selHead.filter((v) => v.checked);
    },
  },
  methods: {
    hihi(item) {
      item.checked = !item.checked;
      this.$emit("renderHead", this.renderHead);
    },
  },
};
</script>