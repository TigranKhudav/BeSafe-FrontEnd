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
    <div
      role="button"
      @click="getFile"
      class="bord d-flex justify-content-center align-items-center"
    >
      <div class="bg-27 w-12 h-12 bg-contain bg-no-repeat"></div>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100"
        v-if="edit"
        type="text"
        :value="data.name"
      />
      <span v-else>{{ data.name }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.passport"
      />
      <span v-else>{{ data.passport }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.caseNum"
      />
      <span v-else>{{ data.caseNum }}</span>
    </div>
    <div class="bord d-flex align-items-center">
      <common-select
        :padding="'pe-10'"
        :Datavalue="prioritys"
        :position="'right-34 top-31'"
      ></common-select>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.amountPaid"
      /><span v-else>{{ data.amountPaid }}</span>
    </div>
  </div>
</template>

<script>
import CommonCheckbox from "./CommonCheckbox.vue";
import CommonSelect from "./CommonSelect.vue";
export default {
  components: { CommonCheckbox, CommonSelect },
  props: {
    data: { type: Object },
    prioritys: { type: Array },
  },
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
    getFile() {
      this.$emit("file", this.data.id);
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 3fr 3fr 3fr 3fr 3fr;
}
.bord {
  border: 1px solid rgb(202, 202, 202);
}
.edit {
  border: none;
}
</style>