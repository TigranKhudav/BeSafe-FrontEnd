<template>
  <transition name="fade">
    <common-modal @close="$emit('close')" @send="createUser">
      <transition name="fade">
        <div v-if="err" class="w-full d-flex justify-content-center">
          <p class="pb-0 text-red-500">Please fill in the fields</p>
        </div>
      </transition>
      <div class="w-36">
        <div class="mb-13">
          <div class="mb-8">
            <span
              @click="newPassInp = !newPassInp"
              role="button"
              class="fs-10 border-bottom text-gray-600"
              >Գաղտնաբառի վերականգնում
            </span>
          </div>
          <div>
            <transition name="fade">
              <div v-if="newPassInp" class="max-w-33">
                <input
                  :class="{
                    'bg-40': !$v.newPass.$error && newPass,
                    'is-invalid': $v.newPass.$error,
                  }"
                  class="
                    w-full
                    bg-p-right bg-no-repeat
                    border-0 border-bottom
                    outline-none
                  "
                  type="text"
                  placeholder="գրեք նոր գաղտնաբառ"
                  v-model.trim="$v.newPass.$model"
                />
                <div class="invalid-feedback">
                  Password must have at least 8 letters.
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div>
          <div>
            <span class="fs-8 text-gray-500">Username</span>
          </div>
          <div
            class="bord p-4 mb-8"
            :class="{ 'is-invalid': $v.userName.$error }"
          >
            <input
              class="w-full border-0 p-0 outline-none"
              type="text"
              v-model.trim="$v.userName.$model"
              required
            />
          </div>
          <div class="invalid-feedback">
            Username must not be empty and must have at least 3 letters.
          </div>
        </div>
        <div class="mt-8">
          <span class="fs-8 text-gray-500">Օգտագործողի տեսակ</span>
        </div>
        <div>
          <div class="bord p-2 mb-8">
            <common-select
              :Datavalue="UserType"
              :Size="'max-h-21 max-w-36 ms-minus'"
              :value="role"
              @onSelect="userType"
            ></common-select>
          </div>
          <div class="invalid-feedback">Please select option.</div>
        </div>
        <div class="mt-8">
          <span class="fs-8 text-gray-500">Ենթաբաժին</span>
        </div>
        <div class="bord p-3 mb-8">
          <common-select
            :Datavalue="Subsection"
            :Size="'max-h-24 max-w-36 ms-minus'"
            :value="accessRend"
            @onSelect="changeAccess"
          ></common-select>
        </div>
        <transition name="fade">
          <div v-if="permissions">
            <div class="mt-8">
              <span class="fs-8 text-gray-500">Իրավասություններ</span>
            </div>
            <div class="bord p-3 mb-18">
              <builder-user-permission
                :value="'Իրավասություններ'"
                :Permission="Competencies"
                @selectedPerm="selPerm = $event"
              ></builder-user-permission>
            </div>
          </div>
        </transition>
      </div>
      <template v-slot:sub> Հաստատել </template>
    </common-modal>
  </transition>
</template>
<script>
import CommonModal from "@/common/CommonModal.vue";
import CommonSelect from "@/common/CommonSelect.vue";
import BuilderUserPermission from "./BuilderUserPermission.vue";
import { minLength, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  components: { CommonModal, CommonSelect, BuilderUserPermission },
  props: { UserInfo: { type: Object, required: true } },
  computed: {
    ...mapGetters(["LawyerPerm", "AllPerm", "Subsection", "UserType"]),
    Competencies() {
      if (this.access === "lawyer") {
        return this.LawyerPerm;
      } else return this.AllPerm;
    },
    userPermission() {
      let arr = [];
      this.selPerm.forEach((v) => arr.push(v.val));
      return arr;
    },
    accessRend() {
      if (this.UserInfo.access === "lawyer") return "Փաստաբանական";
      else if (this.UserInfo.access === "debts") return "Պարտքերի հավաքագրման";
      else if (this.UserInfo.access === "two") {
        return "Փաստաբանական/Պարտքերի հավաքագրման";
      }
    },
  },
  data() {
    return {
      dialog: null,
      permissions: this.UserInfo.role === "admin" ? true : false,
      userName: this.UserInfo.name,
      access: this.UserInfo.access,
      newPass: "",
      role: this.UserInfo.role === "admin" ? "Ադմին" : "Օգտագործող",
      err: false,
      selPerm: null,
      newPassInp: false,
    };
  },
  validations: {
    newPass: { minLength: minLength(8) },
    userName: {
      required,
      minLength: minLength(3),
    },
  },
  methods: {
    userType(val) {
      this.permissions = val.role === "admin" && true;
      this.role = val.role;
    },
    changeAccess(event) {
      this.access = event.access;
    },
    createUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.err = true;
        setTimeout(() => {
          this.err = false;
        }, 3000);
      } else {
        let data = {
          name: this.userName,
          newPass: this.newPass,
          role: this.role,
          access: this.access,
          selPerm: this.userPermission,
        };
        this.$store.dispatch("editUser", data);
      }
    },
  },
};
</script>