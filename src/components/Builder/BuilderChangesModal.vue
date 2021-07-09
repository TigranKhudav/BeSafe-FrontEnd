<template>
  <div class="modal-mask">
    <div class="py-13 px-18 bg-white">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex">
          <div class="bg-17 w-14 h-14 bg-contain bg-no-repeat me-12"></div>
          <span class="fs-10 text-gray-400">Փոփոխությունների պատմություն</span>
        </div>
        <div
          @click="$emit('close')"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
      <ul class="mt-15 p-0">
        <li
          class="bord-top d-flex align-items-center list-style d-flex py-8"
          v-for="item in chagesList"
          :key="item.id"
        >
          <div class="bg-2 w-20 h-15 bg-contain bg-no-repeat"></div>
          <span>{{ item.name }}</span>
          <div class="change-bord min-w-35 w-full max-w-37 px-9 mx-12 py-8">
            <p class="mb-0">{{ item.change }}</p>
          </div>
          <div>
            <span class="text-gray-400 me-12">{{ item.date }}</span>
            <span class="text-gray-400">{{ item.hour }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chagesList: { type: Array },
  },
  data() {
    return {
      showModal: true,
    };
  },
};
</script>
<style scoped>
.bord-top {
  border-top: 1px solid rgb(194, 194, 194);
}
.change-bord {
  border-left: 1px solid rgb(194, 194, 194);
  border-right: 1px solid rgb(194, 194, 194);
}
</style>