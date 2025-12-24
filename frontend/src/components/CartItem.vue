<template>
  <div class="flex items-center gap-6 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
    <img :src="item.image" class="w-24 h-24 object-cover rounded-xl" />
    
    <div class="flex-1">
      <h4 class="font-bold text-gray-900">{{ item.name }}</h4>
      <p class="text-emerald-600 font-medium">${{ item.price }}</p>
    </div>

    <div class="flex items-center bg-gray-100 rounded-lg px-2">
      <button @click="$emit('remove')" class="p-2 text-gray-500 hover:text-red-500">-</button>
      <span class="px-4 font-bold text-gray-800">{{ item.quantity }}</span>
      <button @click="$emit('add')" class="p-2 text-gray-500 hover:text-emerald-600">+</button>
    </div>
    
    <div class="text-right min-w-[80px]">
      <p class="font-black text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['item']);
defineEmits(['add', 'remove']);
</script>