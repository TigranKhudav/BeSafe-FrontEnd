<template>
  <label for="file">
    <div role="button" class="bg-27 w-12 h-12 bg-contain bg-no-repeat">
      <input
        type="file"
        id="file"
        multiple
        accept=".csv,application/vnd.ms-excel,application/msword,.doc,.docx,.xlsx,.xls,image/*,text/plain,.pdf"
        class="opacity-0 w-0"
        @change="$emit('file', $event.target.files)"
      />
    </div>
  </label>
</template>
<script>
export default {};
</script>