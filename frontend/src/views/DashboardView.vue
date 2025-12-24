<template>
  <div class="container mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="w-full md:w-1/3 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div
          class="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl font-black mb-4">
          {{ userStore.user?.name?.charAt(0) || 'U' }}
        </div>
        <h2 class="text-2xl font-black text-gray-900">{{ userStore.user?.name || 'Eco Adventurer' }}</h2>
        <p class="text-gray-400 text-sm mb-6">Member since {{ formatDate('2025-01-01') }}</p>

        <div class="space-y-4">
          <button class="w-full py-3 bg-gray-900 text-white rounded-xl font-bold">Edit Profile</button>
          <button @click="handleLogout"
            class="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 transition-colors">Logout</button>
        </div>
      </div>

      <div class="w-full md:w-2/3 space-y-8">
        <div class="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div class="relative z-10">
            <h3 class="text-lg font-bold opacity-80 uppercase tracking-widest mb-2">Your Impact</h3>
            <p class="text-5xl font-black mb-4">12 Trees Planted</p>
            <p class="text-emerald-100 text-sm max-w-xs">Your purchases have offset 450kg of carbon emissions this year.
              Amazing!</p>
          </div>
          <div class="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
            <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 class="text-xl font-black mb-6">Order History</h3>
          <div v-if="orders.length === 0" class="text-center py-12">
            <p class="text-gray-400 italic">No orders yet. Let's change the world together!</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order.id"
              class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <div>
                <p class="font-bold text-gray-900">Order #{{ order.id }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(order.date) }}</p>
              </div>
              <div class="text-right">
                <p class="font-black text-emerald-600">{{ formatCurrency(order.total) }}</p>
                <p class="text-[10px] uppercase font-bold text-gray-400">{{ order.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { formatCurrency, formatDate } from '../utils/formatters';

const userStore = useUserStore();
const orders = ref([
  { id: '8821', date: '2025-12-10', total: 145.00, status: 'Delivered' },
  { id: '8944', date: '2025-12-22', total: 32.00, status: 'In Transit' }
]);

const handleLogout = () => {
  userStore.isLoggedIn = false;
  window.location.href = '/';
};
</script>