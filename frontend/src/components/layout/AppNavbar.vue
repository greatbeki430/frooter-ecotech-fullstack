<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="flex items-center space-x-2 shrink-0">
        <div class="bg-emerald-600 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="text-2xl font-black text-gray-900 tracking-tighter">
          EcoTech<span class="text-emerald-600">Mart</span>
        </span>
      </router-link>

      <div class="hidden md:flex items-center space-x-10">
        <router-link to="/" class="nav-link">Home</router-link>

        <router-link to="/products" class="nav-link">Shop</router-link>

        <!-- <router-link to="/products" class="nav-link">All Products</router-link> -->
        <router-link to="/track-order" class="nav-link">Track Order</router-link>
      </div>

      <div class="flex items-center space-x-4">
        <router-link to="/cart" class="relative group p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-700 group-hover:text-emerald-600 transition"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span v-if="totalItems > 0"
            class="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
            {{ totalItems }}
          </span>
        </router-link>

        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-gray-600">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div v-show="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 shadow-inner">
      <router-link to="/" @click="isMobileMenuOpen = false" class="mobile-link">Home</router-link>
      <router-link to="/products" @click="isMobileMenuOpen = false" class="mobile-link">Shop</router-link>
      <router-link to="/products" @click="isMobileMenuOpen = false" class="mobile-link">All Products</router-link>
      <router-link to="/track-order" @click="isMobileMenuOpen = false" class="mobile-link">Track Order</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 font-medium hover:text-emerald-600 transition-colors duration-200 text-sm uppercase tracking-wider;
}

.mobile-link {
  @apply block text-gray-700 font-bold text-lg;
}

.router-link-active {
  @apply text-emerald-600;
}
</style>