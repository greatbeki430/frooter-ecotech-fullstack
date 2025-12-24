<template>
  <div
    class="group relative bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 w-full max-w-[280px] mx-auto flex flex-col">

    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img :src="product.image" :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button @click="$emit('preview', product)"
          class="bg-white text-gray-900 px-5 py-2 rounded-full font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
          Quick View
        </button>
      </div>
    </div>

    <div class="p-5 flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h3 class="text-base font-bold text-gray-900 leading-tight">
          {{ product.name }}
        </h3>
        <span class="text-emerald-600 font-black text-lg">${{ product.price }}</span>
      </div>

      <div class="space-y-1.5">
        <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <span>Eco-Impact Score</span>
          <span class="text-emerald-500">{{ product.ecoScore }}%</span>
        </div>
        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-1000"
            :style="{ width: product.ecoScore + '%' }"></div>
        </div>
      </div>

      <button @click="$emit('add-to-cart', product)"
        class="mt-2 w-full bg-[#0f172a] text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-colors active:scale-95">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: 'Hemp Charging Cable',
      price: 15,
      ecoScore: 85,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
    })
  }
});

defineEmits(['add-to-cart', 'preview']);
</script>

<style scoped>
/* Ensures smooth rendering of rounded corners on all browsers */
.group {
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}
</style>