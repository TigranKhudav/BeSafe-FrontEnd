        <template>
  <div class="part-grid">
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
        @click="getHistort"
        class="bg-17 w-10 h-10 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div
      role="button"
      @click="getFile"
      class="bord p-3 d-flex justify-content-center align-items-center"
    >
      <div class="bg-27 w-10 h-10 bg-contain bg-no-repeat"></div>
    </div>
    <div
      @click="edit = true"
      class="bord p-3"
      v-for="item in cols"
      :key="item.id"
    >
      <input
        class="edit w-full h-full outline-none bg-indigo-100"
        v-if="edit"
        type="text"
        :value="item.value"
        @keyup.enter="hi()"
      />
      <span class="fs-8 text-gray-600" v-else>{{ item.value }}</span>
    </div>
  </div>
</template>
<script>
import CommonCheckbox from "@/common/CommonCheckbox.vue";
export default {
  components: { CommonCheckbox },
  props: {
    data: { type: Object },
    head: { type: Array },
    uploadData: { type: Boolean },
  },
  data() {
    return {
      edit: false,
      checked: this.data.checked,
    };
  },
  computed: {
    cols() {
      let arr = [];
      this.head.forEach((i) =>
        arr.push({
          id: i.id,
          value: this.uploadData ? this.data[i.name] : this.data[i.column],
          column: i.column,
        })
      );
      return arr;
    },
  },
  methods: {
    onCheck(event) {
      this.checked = event;
      this.$emit("onCheck", {
        id: this.data.id,
        value: event,
        table: this.cols,
      });
    },
    getHistort() {
      this.$emit("history", this.data.id);
    },
    getInfo() {
      this.$emit("info", this.data.id);
    },
    getFile() {
      this.$emit("file", this.data.id);
    },
    hi() {
      console.log("hi");
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