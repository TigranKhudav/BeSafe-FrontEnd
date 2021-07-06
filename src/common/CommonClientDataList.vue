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
        :value="data.phone"
      />
      <span v-else>{{ data.phone }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.email"
      />
      <span v-else>{{ data.email }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.birthday"
      /><span v-else>{{ data.birthday }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-6': !edit }">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-6"
        v-if="edit"
        type="text"
        :value="data.date"
      /><span v-else>{{ data.date }}</span>
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
      @click="sendEmail"
      class="bord d-flex justify-content-center align-items-center"
    >
      <div class="bg-18 w-12 h-12 bg-contain bg-no-repeat"></div>
    </div>
  </div>
</template>

<script>
import CommonCheckbox from "./CommonCheckbox.vue";
export default {
  components: { CommonCheckbox },
  props: {
    data: { type: Object },
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
    sendEmail() {
      this.$emit("email", { name: this.data.name, email: this.data.email });
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
  grid-template-columns: 1fr 1fr 3fr 3fr 3fr 2fr 2fr 1fr 1fr;
}
.edit {
  border: none;
}
</style>