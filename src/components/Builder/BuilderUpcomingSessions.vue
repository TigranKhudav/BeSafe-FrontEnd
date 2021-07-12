<template>
  <div class="modal-mask">
    <div class="py-11 px-12 bg-white-100 w-full max-w-41">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="bg-32 w-18 h-18 bg-contain bg-no-repeat"></div>
          <div class="ms-16 d-flex align-items-end">
            <span class="fs-11 text-gray-500">Առաջիկա նիստեր</span>
          </div>
        </div>
        <div
          @click="$emit('close')"
          role="button"
          class="bg-25 w-10 h-10 bg-contain bg-no-repeat"
        ></div>
      </div>
      <div class="px-8 mt-15">
        <div class="row" v-for="item in UpComSes" :key="item.id">
          <div class="col-1 border-1 d-flex justify-content-center py-3">
            <span>{{ item.sessionDate }}</span>
          </div>
          <div class="col-1 border-1 d-flex justify-content-center py-3">
            <span>{{ item.sessionHour }}</span>
          </div>
          <div class="col-4 border-1 d-flex justify-content-center py-3">
            <span>{{ item.judgeName }}</span>
          </div>
          <div class="col-6 border-1 d-flex justify-content-center py-3">
            <span>{{ item.residence }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default { props: { UpComSes: { type: Array } } };
</script>