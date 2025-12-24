<template>
  <div class="container mx-auto px-6 py-12 max-w-4xl">
    <h2 class="text-3xl font-bold mb-8 text-gray-900">Checkout</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <form @submit.prevent="handlePayment" class="space-y-4">
        <h3 class="text-lg font-bold">Shipping Details</h3>
        <input type="text" placeholder="Full Name" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required>
        <input type="email" placeholder="Email Address" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required>
        <input type="text" placeholder="Shipping Address" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required>
        
        <div class="pt-6">
          <h3 class="text-lg font-bold mb-4">Payment Information</h3>
          <div class="p-4 border rounded-lg bg-gray-50 text-gray-500">
             💳 Payment simulation via Stripe/PayPal integration later.
          </div>
        </div>
        
        <button type="submit" class="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition">
          Complete Order (${{ cartStore.totalPrice }})
        </button>
      </form>

      <div class="bg-gray-50 p-8 rounded-2xl h-fit">
        <h3 class="text-lg font-bold mb-4">Order Summary</h3>
        <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm mb-2">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="border-t mt-4 pt-4 flex justify-between font-bold text-xl text-emerald-600">
          <span>Total Due</span>
          <span>${{ cartStore.totalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const handlePayment = () => {
  alert('Order placed successfully! Redirecting to home...');
  cartStore.$reset(); // Clear the cart
  router.push('/');
};
</script>