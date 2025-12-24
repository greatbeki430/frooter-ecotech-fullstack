<template>
  <div
    :class="['min-h-screen flex flex-col transition-colors duration-500', isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900']">
    <AppNavbar @open-cart="cartStore.isDrawerOpen = true" />

    <main :class="[
      'flex-grow transition-all duration-300 ease-in-out pt-16',
      cartStore.isDrawerOpen ? 'lg:mr-80' : 'mr-0'
    ]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <EcoAssistant />

    <AppFooter :class="[
      'transition-all duration-300 ease-in-out',
      cartStore.isDrawerOpen ? 'lg:mr-80' : 'mr-0'
    ]" />

    <CartDrawer :isOpen="cartStore.isDrawerOpen" @close="cartStore.isDrawerOpen = false" />
  </div>
</template>

<script setup>
import AppNavbar from './components/layout/AppNavbar.vue';
import AppFooter from './components/layout/AppFooter.vue';
import CartDrawer from './components/CartDrawer.vue';
import EcoAssistant from './components/ai/EcoAssistant.vue'; // New AI Component
import { useCartStore } from './stores/cart';
import { useTheme } from './composables/useTheme'; // New Composable

const cartStore = useCartStore();
const { isDark } = useTheme();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

/* Shimmer Animation for AppSkeleton */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>