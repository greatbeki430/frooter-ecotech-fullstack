<template>
  <div class="space-y-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
    <div>
      <h4 class="font-black uppercase text-[10px] tracking-widest mb-4 text-gray-400">Price Range</h4>
      <input type="range" min="0" max="500" v-model="price" @input="$emit('filter-price', price)"
        class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600">
      <div class="flex justify-between text-xs font-black mt-3 text-gray-900">
        <span>$0</span>
        <span class="text-emerald-600">${{ price }}</span>
      </div>
    </div>

    <div>
      <h4 class="font-black uppercase text-[10px] tracking-widest mb-4 text-gray-400">Categories</h4>
      <div class="space-y-3">
        <div v-for="cat in ['Solar', 'Recycled', 'Eco', 'Lifestyle']" :key="cat"
          class="flex items-center gap-3 group cursor-pointer">
          <div class="relative flex items-center">
            <input type="checkbox" :id="cat" :value="cat" v-model="selectedCats"
              @change="$emit('filter-cat', selectedCats)"
              class="peer w-5 h-5 rounded-md border-gray-200 text-emerald-600 focus:ring-emerald-500/20 transition-all cursor-pointer">
          </div>
          <label :for="cat"
            class="text-sm font-bold text-gray-700 group-hover:text-emerald-600 cursor-pointer transition-colors">
            {{ cat }}
          </label>
        </div>
      </div>
    </div>

    <button @click="resetFilters"
      class="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors border-t border-gray-50 pt-4">
      Reset Filters
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const price = ref(500);
const selectedCats = ref([]); // Stores all currently checked categories

const emit = defineEmits(['filter-price', 'filter-cat']);

const resetFilters = () => {
  price.value = 500;
  selectedCats.value = []; // Clears all checkboxes
  emit('filter-price', 500);
  emit('filter-cat', []); // Tells parent to show all products
};
</script>

<style scoped>
input[type='range']::-webkit-slider-runnable-track {
  background: #f3f4f6;
  border-radius: 999px;
  height: 6px;
}
</style>