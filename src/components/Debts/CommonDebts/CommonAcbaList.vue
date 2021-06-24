        <template>
  <div class="grid">
    <div class="bord p-4 d-flex justify-content-center align-items-center">
      <common-checkbox :value="data.checked"></common-checkbox>
    </div>
    <div class="bord d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getInfo"
        class="bg-16 w-10 h-10 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div class="bord d-flex justify-content-center align-items-center">
      <div
        role="button"
        @click="getHistort"
        class="bg-17 w-10 h-10 bg-contain bg-no-repeat"
      ></div>
    </div>
    <div
      role="button"
      @click="getFile"
      class="bord d-flex justify-content-center align-items-center"
    >
      <div class="bg-27 w-10 h-10 bg-contain bg-no-repeat"></div>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-4': !edit }">
      <input
        class="edit w-full outline-none bg-indigo-100"
        v-if="edit"
        type="text"
        :value="data.name"
      />
      <span class="fs-8 text-gray-600" v-else>{{ data.name }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-4': !edit }">
      <input
        class="edit w-full outline-none bg-indigo-100 p-4"
        v-if="edit"
        type="text"
        :value="data.passport"
      />
      <span class="fs-8 text-gray-600" v-else>{{ data.passport }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-4': !edit }">
      <input
        class="edit w-full outline-none bg-indigo-100 p-4"
        v-if="edit"
        type="text"
        :value="data.caseNum"
      />
      <span class="fs-8 text-gray-600" v-else>{{ data.caseNum }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-4': !edit }">
      <input
        class="edit w-full outline-none bg-indigo-100 p-4"
        v-if="edit"
        type="text"
        :value="data.caseNum"
      />
      <span class="fs-8 text-gray-600" v-else>{{ data.caseNum }}</span>
    </div>
    <div @click="edit = true" class="bord" :class="{ 'p-4': !edit }">
      <input
        class="edit w-full outline-none bg-indigo-100 p-4"
        v-if="edit"
        type="text"
        :value="data.amountPaid"
      /><span class="fs-8 text-gray-600" v-else>{{ data.amountPaid }}</span>
    </div>
  </div>
</template>
<script>
import CommonCheckbox from "@/common/CommonCheckbox.vue";

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
.bord {
  border: 1px solid rgb(202, 202, 202);
}
.edit {
  border: none;
}
</style>