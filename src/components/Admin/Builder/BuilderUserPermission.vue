<template>
  <div>
    <div
      role="button"
      class="d-flex justify-content-between w-full row px-0 mx-0"
      @click="popup = !popup"
    >
      <div class="col px-0">
        <div class="bg-no-repeat h-14"></div>
      </div>
      <div class="col-11 px-0 d-flex align-items-center justify-content-center">
        <span class="fs-8 text-gray-400 user-select-none">
          {{ value }}
        </span>
      </div>
      <div class="col px-0 d-flex justify-content-center align-items-center">
        <div
          role="button"
          class="w-9 h-9 bg-no-repeat bg-contain bg-center"
          :class="popup ? 'bg-6' : 'bg-5'"
        ></div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="popup"
        class="
          position-absolute
          bg-white-100
          shadow-1
          ms-minus
          mt-4
          w-full
          max-w-36
        "
      >
        <ul class="px-5 pt-5 max-h-37">
          <li
            role="button"
            class="d-flex align-items-center ls-none ps-2 my-4 user-select-none"
            v-for="item in Permission"
            :key="item.id"
          >
            <input
              :id="'perm' + item.id"
              type="checkbox"
              class="bord w-9 h-9 appearance-none"
              role="button"
              @click="select(item)"
              :checked="item.checked"
              :value="item.checked"
            />
            <label
              :for="'perm' + item.id"
              role="button"
              class="text-gray-500 fs-8 ms-5"
            >
              {{ item.name }}
            </label>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    Permission: { type: Array, required: true },
    value: { type: String },
  },
  computed: {
    selectedPerm() {
      return this.Permission.filter((v) => v.checked);
    },
  },
  data() {
    return { popup: false };
  },
  methods: {
    select(item) {
      item.checked = !item.checked;
      this.$emit("selectedPerm", this.selectedPerm);
    },
  },
};
</script>
<style scoped>
input:checked {
  background: rgb(74, 74, 255);
}
</style>