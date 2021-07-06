<template>
  <li
    class="
      bg-part
      rounded-8
      w-full
      max-w-23
      py-9
      border-0
      mb-10
      ls-none
      d-flex
      justify-content-center
      year
    "
    role="button"
  >
    <ul class="position-absolute shadow-1 px-10 w-full max-w-29 left-28 mounts">
      <li class="ls-none my-5" v-for="item in mounts" :key="item.id">
        <span
          @click="$emit('getMount', item)"
          class="text-gray-500 hov"
          role="button"
          >{{ item.mount }}</span
        >
      </li>
    </ul>
    <span class="fs-10 fw-600 text-white"><slot /></span>
  </li>
</template>
<script>
export default {
  data() {
    return {
      mounts: [
        {
          id: 1,
          mount: "Հունվար",
        },
        {
          id: 2,
          mount: "Փետրվար",
        },
        {
          id: 3,
          mount: "Մարտ",
        },
        {
          id: 4,
          mount: "Ապրիլ",
        },
        {
          id: 5,
          mount: "Մարտ",
        },
        {
          id: 6,
          mount: "Հունիս",
        },
        {
          id: 7,
          mount: "Հուլիս",
        },
        {
          id: 8,
          mount: "Օգոստոս",
        },
        {
          id: 9,
          mount: "Սեպտեմբեր",
        },
        {
          id: 10,
          mount: "Հոկտեմբեր",
        },
        {
          id: 11,
          mount: "Նոյեմբեր",
        },
        {
          id: 12,
          mount: "Դեկտեմբեր",
        },
      ],
    };
  },
};
</script>
<style scoped>
.mounts {
  display: none;
}
.year:hover {
  max-width: 9rem;
  transition: all 0.3s ease;
}
.year:hover > .mounts {
  display: block;
}
.hov:hover {
  color: rgb(80, 80, 80);
  font-weight: 600;
}
</style>