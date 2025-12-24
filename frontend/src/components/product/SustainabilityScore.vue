<template>
  <div class="space-y-2">
    <div class="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
      <span>Eco-Impact Score</span>
      <span class="text-emerald-600">{{ score }}%</span>
    </div>
    <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div class="h-full bg-emerald-500 transition-all duration-1000" :style="{ width: score + '%' }"></div>
    </div>
  </div>
</template>
<script setup>
defineProps(['score']);
</script>