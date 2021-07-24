<template>
  <div
    class="part-grid"
    v-outside-click="outsideEdit"
    @contextmenu.prevent="$emit('ctxmenu', $event)"
  >
    <div class="bord p-3 d-flex justify-content-center align-items-center">
      <common-checkbox @check="onCheck" :value="checked"></common-checkbox>
    </div>
    <div class="bord p-3 d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getInfo"
        class="bg-16 w-10 h-10 bg-contain bg-no-repeat bg-p-center"
      ></div>
    </div>
    <div class="bord p-3 d-flex justify-content-center align-items-center">
      <div
        role="button"
        id="histr"
        @click="getHistort"
        class="bg-17 w-10 h-10 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div
      role="button"
      class="bord d-flex justify-content-center align-items-center"
    >
      <div
        @click="showFile = true"
        class="bg-27 w-10 h-10 bg-contain bg-no-repeat"
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
      class="bord p-3 h-15 position-relative"
      v-for="(item, i) in cols"
      :key="i"
      @click="onEdit(item.value)"
    >
      <div
        class="text-over-ellipsis ws-nowrap overflow-hidden"
        @mouseover="sohwAllText = true"
        @mouseleave="sohwAllText = false"
      >
        <input
          class="edit w-full h-full outline-none bg-indigo-100"
          v-if="edit"
          type="text"
          :value="item.value"
          @keyup.enter="setValue($event.target.value, item.column)"
        />
        <span class="fs-8 text-gray-600" v-else>{{ item.value }}</span>
      </div>
      <div
        class="p-5 ms-minus shadow-1 position-absolute z-index-1 bg-white-100"
        v-if="sohwAllText && `${item.value}`.length > 42"
      >
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CommonCheckbox from "@/common/CommonCheckbox.vue";
import BuilderFile from "@/components/Builder/BuilderFile.vue";

export default {
  components: { CommonCheckbox, BuilderFile },
  props: { data: { type: Object }, head: { type: Array } },
  data() {
    return {
      sohwAllText: false,
      edit: false,
      oldValue: "",
      lineData: this.data,
      showFile: false,
      files: [],
    };
  },
  computed: {
    checked() {
      return this.data.checked;
    },
    cols: {
      get() {
        return this.head.map((i) => {
          return { id: i.id, value: this.lineData[i.column], column: i.column };
        });
      },
      set(param) {
        this.lineData[param.column] = param.value;
      },
    },
    admin() {
      return this.$store.getters.user.perm.some((v) => v === "editInfo");
    },
  },
  methods: {
    onCheck(event) {
      this.$emit("onCheck", { id: this.data.id, value: event });
    },
    onEdit(value) {
      this.oldValue = value;
      if (!value || this.admin) {
        this.edit = true;
      } else return;
    },
    getHistort() {
      this.$emit("history", this.data.id);
    },
    getInfo() {
      this.$emit("info", this.data.id);
    },
    getFile() {
      this.showFile = true;
      this.$emit("file", this.data.id);
    },
    setValue(value, column) {
      this.cols = { value, column };
      this.$emit("setValue", {
        newValue: value,
        column,
        oldValue: this.oldValue,
      });
    },
    uploadFile(files) {
      this.$store.dispatch("uploadFile", { id: this.data.id, files });
    },
    outsideEdit() {
      this.edit = false;
    },
  },
};
</script>
<style scoped>
.bord {
  border: 1px solid rgb(202, 202, 202);
}
.edit {
  border: none;
}
</style>