<script setup>
</script>

<template>
  <div class="loader-container">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #ddd;
  border-top: 4px solid rgb(114 5 199);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: flex;
  justify-self: center;
    align-self: center;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

</style>