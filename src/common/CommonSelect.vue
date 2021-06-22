<template>
  <div
    :class="padding"
    class="d-flex justify-content-between w-full row"
    @click="popup = !popup"
  >
    <div class="col"></div>
    <div class="col d-flex justify-content-center">
      <span class="text-gray-400">{{ value }}</span>
    </div>
    <div
      role="button"
      class="w-8 h-8 bg-no-repeat bg-contain col bg-center"
      :class="popup ? 'bg-6' : 'bg-5'"
    ></div>
    <transition name="fade">
      <div
        class="
          position-absolute
          shadow-1
          bg-white
          py-8
          w-full
          h-full
          max-h-18 max-w-36 max-h-33
          overflow-y-scroll
        "
        :class="position"
        v-if="popup"
      >
        <ul class="p-0">
          <li
            class="li-hover ls-none px-8 py-4"
            role="button"
            v-for="item in Datavalue"
            :key="item.id"
          >
            <span class="fs-7">{{ item.priority }}</span>
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
    position: { type: String },
    value: { type: String },
    padding: { type: String },
  },
  data() {
    return {
      popup: false,
    };
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