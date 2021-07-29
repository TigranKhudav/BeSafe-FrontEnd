<template>
  <transition name="fade">
    <div
      class="w-full max-w-33 position-absolute top-23 z-index-2"
      v-if="$store.state.menu"
    >
      <div class="w-full bg-white-100" @click="$store.state.menu = false">
        <div v-if="role !== 'debts'">
          <router-link class="text-dec-none" :to="{ path: '/' }">
            <common-button class="h-17">{{ lawyer.title }}</common-button>
          </router-link>
          <div class="bord">
            <ul class="px-12 mb-0">
              <router-link
                v-for="item in lawyer.menuItems"
                :key="item.id"
                :to="'/lawyer/' + item.path"
                tag="li"
                class="ls-none py-8 ps-15 li-border"
                role="button"
              >
                <span class="text-gray-500">{{ item.name }}</span>
              </router-link>
            </ul>
          </div>
        </div>
        <div v-if="role !== 'lawyer'">
          <router-link class="text-dec-none" :to="{ name: 'Debts' }">
            <common-button class="h-17 mt-5">{{ debts.title2 }}</common-button>
          </router-link>
          <div class="bord">
            <ul class="px-12 mb-0">
              <router-link
                v-for="item in debts.menuItems"
                :key="item.id"
                :to="'/debts/' + item.path"
                tag="li"
                class="ls-none py-8 ps-15 li-border"
                role="button"
              >
                <span class="text-gray-500">{{ item.name }}</span>
              </router-link>
            </ul>
          </div>
        </div>
        <div v-if="role === 'admin'" class="w-full bg-pink-350">
          <router-link class="text-dec-none" :to="{ name: 'AdminUsers' }">
            <common-button class="py-5"> Օգտագործողներ </common-button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonButton },
  data() {
    return {
      role: this.$store.getters.user.role,
      lawyer: {
        title: "Փաստաբանական բաժին",
        menuItems: [
          {
            id: 1,
            name: "Գործերի բազա",
            path: "dataofcase",
          },
          {
            id: 2,
            name: "Նիստերի ցանկ",
            path: "list-of-sessions",
          },
          {
            id: 3,
            name: "Դատարանների ցանկ",
            path: "list-of-courts",
          },
        ],
      },
      debts: {
        title2: "Պարտքերի հավաքագրման ենթաբաժին",
        menuItems: [
          { id: 1, name: "Գործընկերներ", path: "partners" },
          { id: 2, name: "Օրվա ենթակա", path: "subjectday" },
          { id: 3, name: "Կարգավիճակներ", path: "statuses" },
          { id: 4, name: "Դատարաններ", path: "list-of-courts" },
        ],
      },
    };
  },
  methods: {
    onSelect(id) {
      this.$store.commit("setComponent", id);
    },
  },
};
</script>
<style scoped>
.li-border {
  border-bottom: 2px solid rgba(201, 132, 157, 1);
}
.bord {
  border-left: 1px solid rgb(187, 187, 187);
  border-right: 1px solid rgb(187, 187, 187);
  box-shadow: 0px 7px 4px -1px rgb(170, 170, 170);
}
</style>