<template>
  <div class="relative">
    <select @change="$emit('sort', $event.target.value)"
      class="bg-white text-gray-900 border border-gray-200 rounded-xl px-4 py-2 text-sm font-black uppercase tracking-widest focus:ring-2 ring-emerald-500 outline-none appearance-none pr-10 shadow-sm cursor-pointer hover:border-emerald-300 transition-colors">
      <option value="featured">All Products</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Top Rated</option>
    </select>

    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineEmits(['sort']);
</script>

<style scoped>
select option {
  color: #111827 !important;
  background-color: white !important;
}
</style>