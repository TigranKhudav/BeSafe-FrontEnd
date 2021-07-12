<template>
  <div>
    <div
      v-outside-click="() => (dropdown = false)"
      class="
        d-flex
        justify-content-between
        align-items-center
        head-border
        pe-20
        py-8
      "
    >
      <div
        role="button"
        @click="$router.push('/')"
        class="bg-4 w-18 h-18 bg-no-repeat bg-contain"
      ></div>
      <div class="d-flex">
        <div class="d-flex border-right">
          <div class="bg-2 w-13 h-13 bg-no-repeat bg-contain"></div>
          <div class="w-20 d-flex align-items-end mx-8">
            <span class="text-gray-400">
              {{ $store.getters.user.username }}
            </span>
          </div>
          <div class="d-flex align-items-end" @click="dropdown = !dropdown">
            <div
              class="bg-5 w-9 h-9 bg-no-repeat bg-contain mx-9"
              :class="{ 'bg-6': dropdown }"
            ></div>
          </div>
        </div>
        <div
          @click="notify = !notify"
          role="button"
          class="bg-7 w-12 h-12 bg-no-repeat bg-contain position-relative ms-9"
        >
          <div
            class="
              d-flex
              justify-content-center
              align-items-center
              position-absolute
              right-minus
              top-2
              bg-pink-350
              w-9
              h-9
              rounded-fifty
            "
          >
            <span>{{ notifyCount }}</span>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="dropdown"
          class="
            position-absolute
            right-20
            w-full
            max-w-31
            mt-26
            bg-pink-350
            z-index-1
          "
        >
          <common-button @click="dropdown = false">
            <router-link to="/profile" class="text-dec-none">
              <div class="d-flex align-items-center ps-5 py-5">
                <div class="bg-2 w-12 h-12 bg-no-repeat bg-contain me-4"></div>
                <span class="text-white-100">Անձնական էջ</span>
              </div>
            </router-link>
          </common-button>
          <div class="w-full ps-5 pe-10">
            <div class="h-2 bg-white-100"></div>
          </div>
          <common-button @click="logOut">
            <div class="d-flex align-items-center ps-5 py-5">
              <div class="bg-8 w-12 h-12 bg-no-repeat bg-contain me-4"></div>
              <span> Ելք </span>
            </div>
          </common-button>
        </div>
      </transition>
      <transition name="fade">
        <div
          class="
            position-absolute
            right-15
            w-full
            max-w-34 max-h-34
            overflow-y-auto
            mt-35
            bg-white
            shadow-1
            z-index-1
          "
          v-if="notify"
        >
          <ul class="px-5 mb-0">
            <li
              class="bord-li ls-none d-flex py-11"
              role="button"
              v-for="item in notifycations"
              :key="item.id"
            >
              <div
                class="
                  bg-10
                  w-12
                  h-12
                  bg-no-repeat bg-contain
                  ms-9
                  border-r-gray
                  px-11
                  me-11
                "
              ></div>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <slot />
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonButton },
  props: {
    notifyCount: { type: Number },
    notifycations: { type: Array },
  },
  data() {
    return {
      dropdown: false,
      notify: false,
    };
  },
  methods: {
    logOut() {
      this.dropdown = false;
      localStorage.removeItem("user");
      localStorage.removeItem("besafe");
      this.$router.replace("/login");
    },
  },
};
</script>
<style scoped>
.head-border {
  border-bottom: 2px solid rgba(201, 132, 157, 1);
}
.border-right {
  border-right: 2px solid rgba(201, 132, 157, 1);
}
.shadow {
  box-shadow: 0px 5px 4px 0px rgb(170, 170, 170);
}
.bord-li {
  border-bottom: 2px solid rgb(212, 212, 212);
}
.border-r-gray {
  border-right: 2px solid rgb(212, 212, 212);
}
</style>