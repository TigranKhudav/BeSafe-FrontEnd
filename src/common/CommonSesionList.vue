<template>
  <div class="grid">
    <div class="bord p-6 d-flex justify-content-center align-items-center">
      <common-checkbox :value="data.checked"></common-checkbox>
    </div>
    <div class="bord d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getInfo"
        class="bg-16 w-12 h-12 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div class="bord d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getHistort"
        class="bg-17 w-12 h-12 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100"
        v-if="edit"
        type="text"
        :value="data.sessionDate"
      />
      <span v-else>{{ data.sessionDate }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.sessionHour"
      />
      <span v-else>{{ data.sessionHour }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.judgeName"
      />
      <span v-else>{{ data.judgeName }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.residence"
      /><span v-else>{{ data.residence }}</span>
    </div>
  </div>
</template>

<script>
import CommonCheckbox from "./CommonCheckbox.vue";
import CommonSelect from "./CommonSelect.vue";
export default {
  components: { CommonCheckbox, CommonSelect },
  props: { data: { type: Object } },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    getHistort() {
      this.$emit("history", this.data.id);
    },
    getInfo() {
      this.$emit("info", this.data.id);
    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 4fr 2fr 4fr 4fr;
}
.bord {
  border: 1px solid rgb(202, 202, 202);
}
.edit {
  border: none;
}
</style>