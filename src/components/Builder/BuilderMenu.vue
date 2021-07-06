<template>
  <div class="w-full max-w-33">
    <div class="w-full">
      <!-- v-if="role === 'lawyer' || role === 'admin'" -->
      <div>
        <router-link class="text-dec-none" :to="{ path: '/' }">
          <common-button class="h-17 mt-5">{{ lawyer.title }}</common-button>
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
      <!-- v-if="role === 'debts' || role === 'admin'" -->
      <div>
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
        <div class="w-full px-10">
          <div class="h-1 bg-white"></div>
        </div>
        <common-button class="py-5"> Հաստատման ենթակա </common-button>
      </div>
    </div>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
export default {
  components: { CommonButton },
  props: {
    role: { type: String },
  },
  data() {
    return {
      lawyer: {
        title: "Փաստաբանական բաժին",
        menuItems: [
          { id: 1, name: "Հաճախորդների բազա" },
          {
            id: 2,
            name: "Գործերի բազա",
          },
          {
            id: 3,
            name: "Նիստերի ցանկ",
          },
          {
            id: 4,
            name: "Դատարանների ցանկ",
          },
        ],
      },
      debts: {
        title2: "Պարտքերի հավաքագրման ենթաբաժին",
        menuItems: [
          { id: 1, name: "Գործընկերներ", path: "partners" },
          { id: 2, name: "Օրվա ենթակա", path: "subjectday" },
          { id: 3, name: "Հաշվետվություններ", path: "reports" },
          { id: 4, name: "Կարգավիճակներ", path: "statuses" },
          { id: 5, name: "Դատարաններ", path: "listofcourts" },
          { id: 6, name: "Շաբլոններ", path: "templates" },
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