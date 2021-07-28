<template>
  <label
    for="file"
    role="button"
    class="text-pink-350 ms-10 fs-10 d-flex align-items-center"
  >
    <slot />
    <input
      type="file"
      id="file"
      accept=".csv,application/vnd.ms-excel,.xlsx,.xls"
      class="d-none"
      @change="uploadUpdateFile"
    />
  </label>
</template>
<script>
import xlsx from "xlsx";
export default {
  methods: {
    uploadUpdateFile(event) {
      let file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = xlsx.read(data, { type: "binary" });
        let rowObj = xlsx.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { raw: false }
        );
        let keys = Object.keys(rowObj[0]);
        let arr = rowObj.map((i) => {
          return keys.map((v) => {
            return { column: v, value: i[v] };
          });
        });
        this.$emit("table", arr);
      };
    },
  },
};
</script>