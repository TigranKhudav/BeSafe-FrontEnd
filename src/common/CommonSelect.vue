<template>
  <div v-outside-click="outside">
    <div
      role="button"
      :class="padding"
      class="d-flex justify-content-between w-full row px-0 mx-0"
      @click="popup = !popup"
    >
      <div class="col px-0">
        <div
          class="bg-no-repeat bg-contain h-11 w-11"
          :class="img && img"
        ></div>
      </div>
      <div class="col-11 px-0 d-flex align-items-center justify-content-center">
        <span class="fs-8 text-gray-400 user-select-none">
          {{ selectedValue }}
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
        :class="Size"
        class="
          position-absolute
          shadow-1
          bg-white-100
          py-7
          mt-3
          px-6
          w-full
          h-full
          overflow-y-auto
        "
        v-if="popup"
      >
        <ul class="p-0 mb-0">
          <li
            class="li-hover ls-none px-8 py-4"
            role="button"
            v-for="item in Datavalue"
            :key="item.id"
            @click="onSelect(item)"
          >
            <span class="fs-7">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    Datavalue: { type: Array },
    value: { type: String, default: "" },
    padding: { type: String },
    img: { type: String },
    Size: { type: String },
  },
  data() {
    return {
      popup: false,
      selectedValue: this.value,
    };
  },
  methods: {
    onSelect(item) {
      this.selectedValue = item.name;
      this.$emit("onSelect", item);
      this.popup = false;
    },
    outside() {
      this.popup = false;
    },
  },
};
</script>
<style scoped>
.li-hover:hover {
  background: rgba(201, 132, 157, 1);
}
.li-hover:hover span {
  color: white;
}
</style>