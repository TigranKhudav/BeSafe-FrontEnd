<template>
  <div class="w-full max-w-38">
    <div class="d-flex bord py-4 ps-8">
      <div class="bg-12 w-11 h-11 bg-contain bg-no-repeat"></div>
      <input
        type="text"
        class="search ms-10 border-0 outline-none"
        placeholder="Փնտրել օգտագործող"
        v-model="searchUser"
      />
    </div>
    <div class="row mx-0" v-for="item in users" :key="item.id">
      <div @click="settings = true" role="button" class="row col-10 px-0 mx-0">
        <div
          class="
            bord
            col
            d-flex
            align-items-center
            justify-content-center
            py-4
            px-0
          "
        >
          <span>{{ item.name }}</span>
        </div>
        <div
          class="
            bord
            col
            d-flex
            align-items-center
            justify-content-center
            py-4
            px-0
          "
        >
          <span>{{ item.role }}</span>
        </div>
      </div>
      <div
        class="
          bord
          d-flex
          align-items-center
          justify-content-center
          px-14
          py-4
          col-2
        "
      >
        <div
          role="button"
          class="bg-34 w-11 h-11 bg-contain bg-no-repeat"
          @click="$emit('removeUser', item.id)"
        ></div>
      </div>
    </div>
    <transition name="fade">
      <common-modal v-if="settings" @close="settings = false">
        <div class="w-34">
          <div>
            <span role="button" class="fs-9 text-gray-500"
              >Գաղտնաբառի վերականգնում</span
            >
          </div>
          <div>
            <div class="mt-6">
              <span class="fs-8 text-gray-500">Username</span>
            </div>
            <div class="bord p-4 mb-6">
              <input class="w-full border-0 p-0" type="text" />
            </div>
            <div class="mt-6">
              <span class="fs-8 text-gray-500">Օգտագործողի տեսակ</span>
            </div>
            <div class="bord p-6 mb-6">
              <common-select></common-select>
            </div>
            <div class="mt-6">
              <span class="fs-8 text-gray-500">Ենթաբաժին</span>
            </div>
            <div class="bord p-6 mb-15">
              <common-select></common-select>
            </div>
          </div>
        </div>
        <template v-slot:sub> Հաստատել </template>
      </common-modal>
    </transition>
  </div>
</template>
<script>
import CommonModal from "@/common/CommonModal.vue";
import CommonSelect from "@/common/CommonSelect.vue";
export default {
  components: { CommonModal, CommonSelect },
  props: { Users: { type: Array } },
  computed: {
    users() {
      return this.Users.filter((item) =>
        item.name.toLowerCase().includes(this.searchUser.toLowerCase())
      );
    },
  },
  data() {
    return {
      settings: false,
      searchUser: "",
    };
  },
};
</script>
<style scoped>
.search::placeholder {
  color: rgb(121, 121, 121);
}
</style>