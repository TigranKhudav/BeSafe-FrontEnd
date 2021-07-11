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
      class="bord p-3"
      v-for="item in cols"
      :key="item.id"
      @click="onEdit(item.value)"
    >
      <input
        class="edit w-full h-full outline-none bg-indigo-100"
        v-if="edit && !item.value"
        type="text"
        :value="item.value"
        @keyup.enter="setValue($event.target.value, item.column)"
      />
      <span class="fs-8 text-gray-600" v-else>{{ item.value }}</span>
    </div>
  </div>
</template>
<script>
import CommonCheckbox from "@/common/CommonCheckbox.vue";
export default {
  components: { CommonCheckbox },
  props: { data: { type: Object }, head: { type: Array } },
  data() {
    return {
      edit: false,
      lineData: this.data,
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
      this.$emit("onCheck", {
        id: this.data.id,
        value: event,
        table: this.cols,
      });
    },
    onEdit(value) {
      if (!value) {
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
      this.$emit("file", this.data.id);
    },
    setValue(value, column) {
      this.cols = { value, column };
      this.$emit("setValue", { newValue: value, column });
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