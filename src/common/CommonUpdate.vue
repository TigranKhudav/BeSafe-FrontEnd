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
        workbook.SheetNames.forEach((sheet) => {
          let rowObj = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.$emit("table", rowObj);
        });
      };
    },
  },
};
</script>