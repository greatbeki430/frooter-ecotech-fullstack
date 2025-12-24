<template>
  <div class="container mx-auto px-6 py-12 max-w-4xl">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-4xl font-black text-gray-900">Shopping Bag</h2>
      <AppBadge v-if="items.length" variant="success">{{ items.length }} Items</AppBadge>
    </div>

    <div v-if="items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-4">
        <CartItem v-for="item in items" :key="item.id" :item="item" @remove="cartStore.removeItem(item.id)" />
      </div>

      <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl h-fit">
        <h3 class="text-xl font-bold mb-6">Summary</h3>
        <div class="space-y-4 mb-8">
          <div class="flex justify-between text-gray-500"><span>Subtotal</span><span>${{ totalPrice }}</span></div>
          <div class="flex justify-between text-gray-500"><span>Shipping</span><span
              class="text-emerald-600 font-bold">FREE</span></div>
          <div class="border-t pt-4 flex justify-between text-2xl font-black"><span>Total</span><span>${{ totalPrice
              }}</span></div>
        </div>

        <button @click="handleStripeCheckout"
          class="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 shadow-lg transition-all transform active:scale-95">
          Secure Checkout
        </button>
        <p class="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">Powered by Stripe &
          Gemini AI</p>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
      <p class="text-xl text-gray-400 mb-6 font-medium">Your eco-bag is empty.</p>
      <router-link to="/products" class="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold">Explore
        Collections</router-link>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../stores/cart';
import { stripeService } from '../services/stripe'; // New Service
import CartItem from '../components/cart/CartItem.vue'; // New Component
import AppBadge from '../components/ui/AppBadge.vue'; // New UI

const cartStore = useCartStore();
const { items, totalPrice } = storeToRefs(cartStore);

const handleStripeCheckout = async () => {
  await stripeService.handleCheckout(items.value, 'customer@ecotech.com');
};
</script>