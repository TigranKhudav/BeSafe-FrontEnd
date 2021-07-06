<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <h3 class="fs-12 text-gray-500">Կարգավիճակներ</h3>
    </div>
    <div>
      <ul class="mt-18">
        <li
          class="ls-none w-full bg-gray-150 py-8 ps-23 mb-8"
          v-for="item in Statuses"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { Statuses: this.$store.getters.Statuses };
  },
};
</script>