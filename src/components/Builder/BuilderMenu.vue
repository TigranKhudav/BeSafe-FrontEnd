<template>
  <div class="w-full">
    <div class="w-full mt-18">
      <!-- <common-button class="h-17 mt-10">{{ lawyer.title }}</common-button>
      <div class="bord">
        <ul class="px-12 mb-0">
          <li
            class="ls-none py-9 ps-15 li-border"
            role="button"
            v-for="item in lawyer.menuItems"
            :key="item.id"
            @click="onSelect(item.id)"
          >
            <span class="fs-8 text-gray-500">{{ item.name }}</span>
          </li>
        </ul>
      </div> -->
      <!-- v-if="role === 'debts'" -->
      <div>
        <router-link :to="{ name: 'Debts' }">
          <common-button class="h-17 mt-5">{{ debts.title2 }}</common-button>
        </router-link>
        <div class="bord">
          <ul class="px-12 mb-0">
            <router-link
              v-for="item in debts.menuItems2"
              :key="item.id"
              :to="'/debts/' + item.path"
              tag="li"
              class="ls-none py-9 ps-15 li-border"
              role="button"
            >
              <span class="fs-8 text-gray-500">{{ item.name }}</span>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <div></div>
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
        menuItems2: [
          { id: 1, name: "Գործընկերներ", path: "partners" },
          { id: 2, name: "Օրվա ենթակա", path: "day" },
          {
            id: 3,
            name: "Հաշվետվություններ",
            path: "partners",
          },
          {
            id: 4,
            name: "Կարգավիճակներ",
            path: "partners",
          },
          {
            id: 5,
            name: "Դատարաններ",
            path: "partners",
          },
          {
            id: 6,
            name: "Շաբլոններ",
            path: "partners",
          },
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