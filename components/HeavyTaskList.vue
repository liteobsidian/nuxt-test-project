<template>
  <div class="space-y-2">
    <h2 class="text-2xl font-bold mb-4">Очень тяжёлая задача</h2>

    <div v-for="n in 150000" :key="n" class="p-4 bg-gray-100 rounded-md shadow">
      Задача № {{ n }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Ничего особо здесь не нужно
</script>
