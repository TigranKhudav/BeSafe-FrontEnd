<template>
  <div
    class="position-absolute bg-white shadow-1 top-25 w-full max-w-36 right-22"
  >
    <ul class="pe-5 ps-0 pt-5">
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
      if (item.checked) {
        item.checked = !item.checked;
        this.$emit("renderHead", this.renderHead);
      } else if (!item.checked && this.renderHead.length < 5) {
        item.checked = !item.checked;
        this.$emit("renderHead", this.renderHead);
      }
    },
  },
};
</script>