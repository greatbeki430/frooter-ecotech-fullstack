<template>
  <div class="min-h-screen bg-slate-50">
    <div class="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

      <aside class="w-full lg:w-72 space-y-6">
        <div class="sticky top-24">
          <div class="mb-6">
            <input v-model="productStore.searchQuery" type="text" placeholder="Search eco-tech..."
              class="w-full px-5 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500" />
          </div>

          <ProductFilters @filter-cat="handleFilter" @filter-price="handlePriceFilter" />

          <div
            class="hidden lg:block mt-6 bg-emerald-600 p-6 rounded-[2rem] text-white shadow-lg border border-emerald-500/20">
            <h4 class="font-bold mb-2 flex items-center gap-2">
              <span class="text-xl">💡</span> Eco Tip
            </h4>
            <p class="text-xs opacity-90 leading-relaxed">
              Solar products reduce your carbon footprint by 30% on average. Switch today for a greener tomorrow!
            </p>
          </div>
        </div>
      </aside>

      <div class="flex-grow">
        <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 class="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              {{ productStore.activeCategory === 'all' ? 'Featured Eco-Tech' : productStore.activeCategory }}
            </h2>
            <p class="text-gray-500 text-sm font-medium">{{ productStore.filteredProducts.length }} Sustainable items
              found</p>
          </div>
          <ProductSort @sort="handleSort" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <transition-group name="product-list">
            <div v-for="product in productStore.filteredProducts" :key="product.id"
              class="group bg-white border border-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

              <router-link :to="'/product/' + product.id" class="block h-56 overflow-hidden relative">
                <img :src="product.image" :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div
                  class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span
                    class="bg-white text-gray-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </span>
                </div>
              </router-link>

              <div class="p-5 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-3 gap-2">
                  <h3 class="font-bold text-base text-gray-800 leading-tight">{{ product.name }}</h3>
                  <span class="text-emerald-600 font-black text-lg">${{ product.price }}</span>
                </div>

                <div class="mt-auto space-y-4">
                  <div class="bg-slate-50 p-3 rounded-2xl">
                    <SustainabilityScore :score="product.ecoScore || 85" />
                  </div>

                  <button @click="handleAddToCart(product)" :class="[
                    'w-full py-4 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all transform active:scale-95 flex items-center justify-center gap-2',
                    addedId === product.id ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-emerald-600 shadow-lg'
                  ]">
                    <span v-if="addedId === product.id">Added! 🎉</span>
                    <span v-else>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useProductStore } from '../stores/products';
import ProductFilters from '../components/product/ProductFilters.vue';
import ProductSort from '../components/product/ProductSort.vue';
import SustainabilityScore from '../components/product/SustainabilityScore.vue';

const cartStore = useCartStore();
const productStore = useProductStore();
const addedId = ref(null);

const handleFilter = (categories) => {
  if (!categories || categories.length === 0) {
    productStore.activeCategory = 'all';
  } else {
    productStore.activeCategory = categories[categories.length - 1];
  }
};

const handlePriceFilter = (val) => {
  if (productStore.maxPrice !== undefined) {
    productStore.maxPrice = val;
  }
};

const handleAddToCart = (product) => {
  cartStore.addItem(product);
  addedId.value = product.id;
  setTimeout(() => { addedId.value = null; }, 1500);
};

const handleSort = (type) => {
  if (type === 'price-low') productStore.items.sort((a, b) => a.price - b.price);
  else if (type === 'price-high') productStore.items.sort((a, b) => b.price - a.price);
  else if (type === 'rating') productStore.items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (type === 'featured') productStore.items.sort((a, b) => a.id - b.id);
};
</script>

<style scoped>
.product-list-move {
  transition: transform 0.5s ease;
}
</style>