<template>
  <div class="d-flex">
    <div class="d-flex w-full justify-content-center mt-10">
      <common-button
        @click="showAddUserModal"
        class="position-absolute top-22 right-22 w-full max-w-31 rounded-16"
      >
        <div class="p-4 d-flex">
          <div class="bg-15 w-10 h-10 bg-contain bg-no-repeat me-3"></div>
          <span>Ավելացնել oգտագործող</span>
        </div>
      </common-button>

      <transition name="fade">
        <builder-add-user
          @close="addUserModal = false"
          v-if="addUserModal"
        ></builder-add-user>
      </transition>

      <transition name="fade">
        <builder-edit-user
          v-if="editUserModal"
          @close="editUserModal = false"
          :UserInfo="UserInfo"
        ></builder-edit-user>
      </transition>

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
        <div class="row mx-0" v-for="(item, i) in fitereduser" :key="i">
          <div @click="onEdit(item)" role="button" class="row col-10 px-0 mx-0">
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
              <span>{{ item.username }}</span>
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
              <span v-if="item.role === 'admin'">Ադմին</span>
              <span v-else>Օգտագործող</span>
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
              @click="removeUser(item.id)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import BuilderAddUser from "./Builder/BuilderAddUser.vue";
import BuilderEditUser from "./Builder/BuilderEditUser.vue";
export default {
  components: { CommonButton, BuilderAddUser, BuilderEditUser },
  data() {
    return {
      settings: false,
      searchUser: "",
      addUserModal: false,
      editUserModal: false,
      UserInfo: null,
    };
  },
  computed: {
    Users() {
      return this.$store.getters.Users;
    },
    fitereduser: {
      get() {
        return this.Users.filter((v) =>
          v.username.toLowerCase().includes(this.searchUser.toLowerCase())
        );
      },
      set(id) {
        let i = this.Users.findIndex((v) => v.id === id);
        this.Users.splice(i, 1);
      },
    },
  },
  methods: {
    onEdit(user) {
      this.editUserModal = true;
      this.UserInfo = user;
    },
    removeUser(id) {
      this.fitereduser = id;
      this.$store.dispatch("removeUser", id);
    },
    showAddUserModal() {
      this.addUserModal = true;
      this.$store.dispatch("getPartners");
    },
  },
};
</script>
<style scoped>
.search::placeholder {
  color: rgb(121, 121, 121);
}
</style>