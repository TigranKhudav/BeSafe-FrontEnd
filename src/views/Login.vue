<template>
  <div
    class="d-flex align-items-center justify-content-center h-100"
    @keyup.enter="ShowInputs"
  >
    <div class="w-full max-w-35 mb-25">
      <div class="bg-1 w-23 h-23 bg-contain bg-no-repeat"></div>
      <div class="mb-20">
        <common-input
          @onInput="username = $event"
          :img="'bg-2'"
          :placeholder="'Մուտքանուն'"
        ></common-input>
      </div>
      <div class="my-14">
        <common-input
          @onInput="password = $event"
          :placeholder="'Գաղտնաբառ'"
        ></common-input>
        <transition name="fade">
          <div v-if="$store.state.errMessig" class="mt-6">
            <span class="fs-8 text-red-800">*Ձեր գաղտնաբառը սխալ է</span>
          </div>
        </transition>
      </div>
      <common-button @click="ShowInputs" class="w-full p-6">
        Մուտք Գործել
      </common-button>
    </div>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonInput from "@/common/CommonInput.vue";
export default {
  components: { CommonButton, CommonInput },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ShowInputs() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
<style scoped>
.plac {
  background-size: 1.5rem 1.5rem;
  background-position: left center;
}
.plac::placeholder {
  color: gray;
  font-size: 0.9rem;
}
</style>