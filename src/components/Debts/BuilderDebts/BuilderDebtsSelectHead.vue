<template>
  <div class="position-absolute">
    <ul>
      <li role="button" v-for="item in selHead" :key="item.id">
        <input type="checkbox" class="d-none" name="" id="" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { selHead: { type: Array } },
};
</script>

<style>
</style>