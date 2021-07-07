<template>
  <div class="pt-25">
    <div class="mb-25 d-flex w-full justify-content-center">
      <div
        @click="addPartModal = true"
        v-if="admin"
        class="d-flex"
        role="button"
      >
        <div class="bg-42 w-11 h-11 bg-no-repeat bg-contain"></div>
        <span class="text-pink-350 ms-6">Ավելացնել գործընկեր</span>
      </div>
    </div>
    <common-modal
      v-if="addPartModal"
      @close="addPartModal = false"
      @send="addPartner"
    >
      <div class="my-10 min-w-32">
        <div class="mb-10">
          <span>Կազմակերպության անվանում</span>
        </div>
        <div class="mb-10">
          <input
            type="text"
            v-model.trim="$v.partnerName.$model"
            class="py-4 w-full"
            :class="{ 'is-invalid': $v.partnerName.$error }"
          />
          <div class="invalid-feedback">Username must not be empty</div>
        </div>
      </div>
      <template v-slot:sub>Հաստատել</template>
    </common-modal>
    <div class="container d-flex flex-dir-column align-items-center px-18">
      <div class="d-flex justify-content-between w-full">
        <button
          role="button"
          v-for="item in Partners"
          :key="item.id"
          @click="$router.push(item.key)"
          class="bg-part rounded-8 w-full max-w-24 py-13 border-0"
        >
          <span class="fs-10 fw-600 text-white">{{ item.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CommonModal from "@/common/CommonModal.vue";
import { required } from "vuelidate/lib/validators";
export default {
  components: { CommonModal },
  computed: {
    admin() {
      return this.$store.getters.userperm.some((v) => v === "addPartners");
    },
    Partners() {
      return this.$store.getters.Partners;
    },
  },
  data() {
    return {
      partnerName: "",
      addPartModal: false,
    };
  },
  validations: {
    partnerName: { required },
  },
  methods: {
    addPartner() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.$store.dispatch("createPartner", {
          name: this.partnerName,
          key: this.partnerName.toLowerCase().replace(/ /g, "-"),
        });
      }
    },
  },
};
</script>