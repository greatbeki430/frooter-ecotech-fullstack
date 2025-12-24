<template>
  <div class="flex items-center gap-4 py-4 border-b border-gray-50">
    <img :src="item.image" class="w-16 h-16 rounded-xl object-cover bg-gray-50" />
    <div class="flex-grow">
      <h4 class="font-bold text-sm">{{ item.name }}</h4>
      <p class="text-xs text-gray-500">${{ item.price }} x {{ item.quantity }}</p>
    </div>
    <button @click="$emit('remove')" class="text-gray-300 hover:text-red-500 transition-colors">×</button>
  </div>
</template>
<script setup>
defineProps(['item']);
</script>