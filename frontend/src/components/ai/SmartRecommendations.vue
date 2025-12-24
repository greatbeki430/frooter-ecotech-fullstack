<template>
  <div class="mt-20">
    <h3 class="text-xl font-black mb-6 flex items-center gap-2">
      <span class="w-2 h-6 bg-emerald-500 rounded-full"></span>
      AI Smart Suggestions
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="p in recommendations" :key="p.id" class="group cursor-pointer">
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-2">
          <img :src="p.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        </div>
        <p class="text-sm font-bold truncate">{{ p.name }}</p>
        <p class="text-xs text-emerald-600 font-bold">${{ p.price }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(['recommendations']);
</script>