<template>
  <div class="mt-8 d-flex align-items-center">
    <div class="bg-41 w-11 h-11 bg-no-repeat bg-contain"></div>
    <label for="file" role="button" class="text-pink-350 ms-10 fs-10"
      >Թարմացում</label
    >
    <input
      type="file"
      id="file"
      accept=".csv,application/vnd.ms-excel,.xlsx,.xls"
      role="button"
      class="opacity-0 w-0"
      @change="uploadUpdateFile"
    />
  </div>
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
          let rowObj = xlsx.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          console.log(rowObj);
        });
      };
    },
  },
};
</script>