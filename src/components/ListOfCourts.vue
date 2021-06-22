<template>
  <div class="px-22">
    <div>
      <div class="ms-24">
        <span class="fs-12 text-gray-500">Դատարանների ցանկ</span>
      </div>
      <div class="px-8 max-h-80 overflow-y-scroll">
        <common-court>
          <template v-slot:place>Երևան</template>
          Երևան քաղաքի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք․ Երևան, Տիգրան Մեծի 23/1</template>
        </common-court>
        <common-court>
          <template v-slot:place>Կոտայք</template>
          ՀՀ Կոտայքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city
            >ք. Հրազդան, Միկրոշրջան թաղամաս, 13-րդ փող., 1/1</template
          >
        </common-court>
        <common-court>
          <template v-slot:place>Վայոց Ձոր</template>
          ՀՀ Արարատի և Վայոց ձորի մարզերի առաջին ատյանի ընդհանուր իրավասության
          դատարան
          <template v-slot:city>ք. Արտաշատ, Շահումյան 19</template>
        </common-court>
        <common-court>
          <template v-slot:place>Արմավիր</template>
          ՀՀ Արմավիրի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Արմավիր, Հանրապետության 41</template>
        </common-court>
        <common-court>
          <template v-slot:place>Արագածոտն</template>
          ՀՀ Արագածոտնի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Աշտարակ, Էջմիածնի խճուղի 65</template>
        </common-court>
        <common-court>
          <template v-slot:place>Տավուշ</template>
          ՀՀ Տավուշի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Իջևան, Նալբանդյան 1/1</template>
        </common-court>
        <common-court>
          <template v-slot:place>Գեղարքունիք</template>
          ՀՀ Գեղարքունիքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Գավառ, Սայադյան 18</template>
        </common-court>
        <common-court>
          <template v-slot:place>Լոռի</template>
          ՀՀ Լոռու մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Վանաձոր, Մխիթար Գոշի 6</template>
        </common-court>
        <common-court>
          <template v-slot:place>Սյունիք</template>
          Սյունիքի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Կապան, Մելիք Ստեփանյան 3/2</template>
        </common-court>
        <common-court>
          <template v-slot:place>Շիրակ</template>
          ՀՀ Շիրակի մարզի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Գյումրի, Անկախության հրապարակ 7</template>
        </common-court>
        <!-- <common-court>
          <template v-slot:place>Արարատ</template>
          ՀՀ Արարատի և Վայոց ձորի մարզերի առաջին ատյանի ընդհանուր իրավասության դատարան
          <template v-slot:city>ք. Արտաշատ, Շահումյան 19</template>
        </common-court>     -->
        <common-court>
          <template v-slot:place>ԼՂՀ</template>
          Արցախի Հանրապետության ընդհանուր իրավասության առաջին ատյանի դատարան
          <template v-slot:city>ք.Ստեփանակերտ, Ազատամարտիկների 42</template>
        </common-court>
      </div>
    </div>
    <div class="my-auto position-absolute top-fifty right-16">
      <common-button
        ><div class="bg-19 w-12 h-12 bg-contain bg-no-repeat"></div
      ></common-button>
      <common-button
        ><div class="bg-20 w-12 h-12 bg-contain bg-no-repeat"></div
      ></common-button>
    </div>
  </div>
</template>
<script>
import CommonButton from "@/common/CommonButton.vue";
import CommonCourt from "@/common/CommonCourt.vue";
export default {
  components: { CommonButton, CommonCourt },
};
</script>
<style scoped>
</style>