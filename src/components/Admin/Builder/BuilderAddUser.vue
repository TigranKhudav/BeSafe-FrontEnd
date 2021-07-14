<template>
  <transition name="fade">
    <common-modal @close="$emit('close')" @send="createUser">
      <transition name="fade">
        <div v-if="err" class="w-full d-flex justify-content-center">
          <p class="pb-0 text-red-500">Please fill in the fields</p>
        </div>
      </transition>
      <div class="w-36">
        <div>
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
          <div>
            <div class="mt-8">
              <span class="fs-8 text-gray-500">Գաղտնաբառ</span>
            </div>
            <div
              class="bord p-4 mb-8"
              :class="{ 'is-invalid': $v.pass.$error }"
            >
              <input
                v-model.trim="$v.pass.$model"
                class="w-full border-0 p-0 outline-none"
                type="text"
                required
              />
            </div>
            <div class="invalid-feedback">
              Password must have at least 8 letters.
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
                :value="'Օգտագործողի տեսակ'"
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
              :value="'Ենթաբաժին'"
              @onSelect="access = $event.access"
            ></common-select>
          </div>

          <transition name="fade">
            <div>
              <div class="mt-8">
                <span class="fs-8 text-gray-500">Գործընկեր</span>
              </div>
              <div class="bord p-3 mb-8">
                <builder-user-permission
                  :value="'Գործընկեր'"
                  :Permission="Part"
                  @selectedPerm="selPart = $event"
                ></builder-user-permission>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="permissions">
              <div class="">
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
  computed: {
    ...mapGetters([
      "LawyerPerm",
      "AllPerm",
      "Subsection",
      "UserType",
      "Partners",
    ]),
    Competencies() {
      if (this.access === "lawyer") {
        return this.LawyerPerm;
      } else return this.AllPerm;
    },
    userPermission() {
      if (this.role === "admin") {
        let arr = [];
        this.selPerm.forEach((v) => arr.push(v.val));
        return arr;
      } else return null;
    },
    Part() {
      let arr = [];
      this.Partners.forEach((v) => {
        v.checked = false;
        arr.push(v);
      });
      return arr;
    },
  },
  data() {
    return {
      dialog: null,
      permissions: false,
      userName: "",
      pass: "",
      access: "",
      role: "",
      err: false,
      selPerm: null,
      selPart: null,
    };
  },
  validations: {
    pass: { minLength: minLength(8) },
    userName: {
      required,
      minLength: minLength(3),
    },
    role: { required },
    access: { required },
  },
  methods: {
    userType(val) {
      this.permissions = val.role === "admin" && true;
      this.role = val.role;
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
          username: this.userName,
          password: this.pass,
          role: this.role,
          access: this.access,
          permissions: this.userPermission,
          partners: this.selPart,
        };
        // this.$store.dispatch("createUser", data);
        this.$emit("close");
      }
    },
  },
};
</script>