<template>
  <div>
    <div class="position-absolute left-23 top-22">
      <h3 class="fs-12 text-gray-500">Շաբլոններ</h3>
    </div>
    <div class="px-8 mt-13 max-h-83 overflow-y-auto">
      <div class="px-15">
        <div class="row">
          <div
            class="col-4 d-flex align-items-center mb-17 px-15"
            v-for="item in templates"
            :key="item.id"
          >
            <div class="bg-38 w-17 h-17 bg-contain bg-no-repeat"></div>
            <span class="ms-12 text-gray-400 w-full">{{ item.name }}</span>
            <button
              v-if="admin"
              @click="$emit('close')"
              type="button"
              class="btn-close outline-none mb-11"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    admin() {
      return this.$store.getters.user.perm.some((v) => v === "removeInfo");
    },
  },
  data() {
    return {
      templates: [
        { id: 1, name: "Թերի փաստաթղթեր" },
        { id: 2, name: "Բանակցություն" },
        { id: 3, name: "Դատարան. Հայցադիմումը ուղարկվել է դատարան" },
        { id: 4, name: "Դատարան.ՎԿ վերացվել է (ծանուցման խնդիր)" },
        { id: 5, name: "Դատարան. ՎԿ վերացվել է (Առարկություն)" },
        { id: 6, name: "Դատարան. ՎԿ վերացվել է (Վճարել է)" },
        { id: 7, name: "Դատարան. Կատարողական թերթի դիմում.պարտապան" },
        { id: 8, name: "Դատարան. Տրամադրվել է Կատարողական Թերթ" },
        { id: 9, name: "ԴԱՀԿ որոշում վարույթ հարուցելու մասին" },
        { id: 10, name: "ԴԱՀԿ (Կասեցված)" },
        { id: 11, name: "ԴԱՀԿ (Ավարտված)" },
        { id: 12, name: "ԴԱՀԿ ( Կարճված)" },
        { id: 13, name: "Դատարան. Հայցադիմումն ընդունվել է վարույթ" },
        { id: 14, name: "Դատարան. Նշանակվել է դատական նիստ" },
        { id: 15, name: "Դատարան. Գործի վարույթը կասեցվել է" },
        { id: 16, name: "Դատարան. Վճիռ ( Բավարարվել է ամբողջությամբ)" },
        { id: 17, name: "Դատարան. Վճիռ (Բավարարվել է մասնակի)" },
        { id: 18, name: "Դատարան. Վճիռ ( Մերժվել է)" },
        { id: 19, name: "Դատարան. Վճիռ ( Կարճված)" },
        { id: 20, name: "Դատարան. ՎԿ մի մասով " },
        { id: 21, name: "Դատարան. Հայցային վարույթի նախապատրաստում" },
        {
          id: 22,
          name: "Դատարան./ ՎԿ-ն մտել է ",
        },
        { id: 23, name: "ԴԱՀԿ (կատարողական վարույթը վերսկսվելու մասին)" },
        { id: 24, name: "Դատարան. Սնանկ է ճանաչվել" },
        { id: 25, name: "Կատարողական թերթը դատարանի կողմից ուղարկվել է ԴԱՀԿ" },
        { id: 26, name: "Դատարան.ՎԿ մերժվել է" },
        { id: 27, name: "Դատարան.ՎԿ ուժի մեջ է մտել մասնակի" },
        { id: 28, name: "Ժամկետանց կ/թ" },
        { id: 29, name: "Դատարան. Հայցադիմումը վերադարձվել է" },
        { id: 30, name: "Վճարված" },
        { id: 31, name: "Թերի պայմանագիր" },
        { id: 32, name: "Թերի քաղվածք" },
      ],
    };
  },
};
</script>