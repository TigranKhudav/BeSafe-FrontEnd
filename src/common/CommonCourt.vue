<template>
  <div class="w-full py-6 px-18 bg-gray-100 my-11">
    <div class="d-flex mb-4">
      <span class="me-27 text-gray-600 fs-10"><slot name="place" /></span>
      <p class="text-gray-500 fs-10 mb-0"><slot /></p>
    </div>
    <div class="row">
      <div class="col-7"></div>
      <div class="col-5">
        <span class="text-pink-350 fs-10"><slot name="city" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>