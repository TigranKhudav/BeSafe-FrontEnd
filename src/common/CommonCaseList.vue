<template>
  <div class="grid-case">
    <div class="bord p-3 d-flex justify-content-center align-items-center">
      <common-checkbox :value="data.checked"></common-checkbox>
    </div>
    <div class="bord d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getInfo"
        class="bg-16 w-6 h-12 bg-contain bg-no-repeat"
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
      class="bord d-flex justify-content-center align-items-center"
    >
      <div
        @click="showFile = true"
        class="bg-27 w-12 h-12 bg-contain bg-no-repeat"
      ></div>
      <transition name="fade">
        <builder-file
          v-if="showFile"
          :files="files"
          @uploadFile="uploadFile"
          @close="showFile = false"
        ></builder-file>
      </transition>
    </div>

    <div
      @click="edit = true"
      class="bord ps-6 d-flex align-items-center"
      :class="{ 'bg-indigo-100': edit }"
    >
      <input
        class="edit w-full h-full outline-none bg-indigo-100"
        v-if="edit"
        type="text"
        :value="data.name"
      />
      <span v-else>{{ data.name }}</span>
    </div>
    <div
      @click="edit = true"
      :class="{ 'bg-indigo-100': edit }"
      class="bord ps-6 d-flex align-items-center"
    >
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-3"
        v-if="edit"
        type="text"
        :value="data.passport"
      />
      <span v-else>{{ data.passport }}</span>
    </div>
    <div
      @click="edit = true"
      :class="{ 'bg-indigo-100': edit }"
      class="bord ps-6 d-flex align-items-center"
    >
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-3"
        v-if="edit"
        type="text"
        :value="data.caseNum"
      />
      <span v-else>{{ data.caseNum }}</span>
    </div>
    <div class="bord">
      <common-select
        :Size="'max-h-33 max-w-status'"
        :Datavalue="prioritys"
      ></common-select>
    </div>
    <div @click="edit = true" :class="{ 'bg-indigo-100': edit }" class="bord">
      <input
        class="edit w-full h-full outline-none bg-indigo-100 p-3"
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
import BuilderFile from "@/components/Builder/BuilderFile.vue";

export default {
  components: { CommonCheckbox, CommonSelect, BuilderFile },
  props: {
    data: { type: Object },
    prioritys: { type: Array },
  },
  data() {
    return {
      edit: false,
      showFile: false,
      files: [],
    };
  },
  methods: {
    getHistort() {
      this.$emit("history", this.data.id);
    },
    getInfo() {
      this.$emit("info", this.data.id);
    },
    uploadFile(files) {
      this.$store.dispatch("uploadFile", { id: this.data.id, files });
    },
  },
};
</script>
<style scoped>
.grid-case {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 6fr 4fr 4fr 12fr 4fr;
}
.edit {
  border: none;
}
</style>