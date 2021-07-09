<template>
  <common-main-page>
    <div class="w-full container px-0 mt-6">
      <div class="bg-pink-350 d-flex justify-content-between px-18 py-3">
        <span class="text-white">Username</span>
        <span class="text-white">Փոփոխություն</span>
        <span class="text-white">Հաստատում</span>
      </div>
      <div class="mt-8">
        <div class="row px-7" v-for="item in SubjectToApproval" :key="item.id">
          <div class="col-2 bord p-8">
            <span>{{ item.username }}</span>
          </div>
          <div class="col-8 bord p-8">
            <div class="d-flex text-pink-350">
              <span>{{ item.section }}</span>
              >
              <span>{{ item.column }}</span>
            </div>
            <div>
              <span class="text-gray-500">{{ item.change }}</span>
            </div>
          </div>
          <div
            class="
              col-1
              bord
              p-8
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <span role="button" class="text-dec-underline text-gray-500"
              >Հաստատել</span
            >
          </div>
          <div
            class="
              col-1
              bord
              p-8
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <span role="button" class="text-dec-underline text-gray-500"
              >Մերժել</span
            >
          </div>
        </div>
      </div>
    </div>
  </common-main-page>
</template>
<script>
import CommonMainPage from "@/common/CommonMainPage.vue";
export default {
  components: { CommonMainPage },
  data() {
    return {
      SubjectToApproval: [
        {
          id: 1,
          username: "magaharutyunjan1",
          section: "Հաշվետվություններ",
          column: "վճռի կայացման ամսաթիվ",
          change: "11․08․21",
        },
      ],
    };
  },
};
</script>