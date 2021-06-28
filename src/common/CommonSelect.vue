<template>
  <div
    role="button"
    :class="padding"
    class="d-flex justify-content-between w-full row mx-0"
    @click="popup = !popup"
  >
    <div class="col pe-0" v-if="hide" :class="{ 'ps-9': hide }">
      <div class="bg-no-repeat h-14" :class="img && img"></div>
    </div>
    <div class="col-10 px-0 d-flex align-items-center justify-content-center">
      <span :class="!hide ? 'w-full' : 'text-gray-400'">
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
    <transition name="fade">
      <div
        class="
          position-absolute
          shadow-1
          bg-white
          py-8
          w-full
          h-full
          mt-15
          max-w-36 max-h-33
          overflow-y-scroll
        "
        v-if="popup"
      >
        <ul class="p-0">
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
    value: { type: String },
    padding: { type: String },
    img: { type: String },
    hide: { type: Boolean, default: true },
  },
  data() {
    return {
      popup: false,
    };
  },
  methods: {
    onSelect(item) {
      this.value = item.name;
      this.$emit("onSelect", item);
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