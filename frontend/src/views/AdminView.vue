<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-10">
    <div class="container mx-auto">
      <header class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p class="text-gray-500">Managing EcoTechMart Inventory & Sales</p>
        </div>
        <button
          class="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-500 transition-all">
          + Add New Product
        </button>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{{ stat.label }}</p>
          <p class="text-3xl font-black text-gray-900">{{ stat.value }}</p>
          <p :class="['text-xs mt-2 font-bold', stat.trendUp ? 'text-emerald-500' : 'text-red-500']">
            {{ stat.trendUp ? '↑' : '↓' }} {{ stat.trend }}
          </p>
        </div>
      </div>

      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 class="text-xl font-black">Current Inventory</h3>
          <div class="flex gap-2">
            <input type="text" placeholder="Search product..."
              class="px-4 py-2 bg-gray-100 rounded-xl text-sm border-none focus:ring-2 ring-emerald-500 outline-none">
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th class="p-6">Product Name</th>
                <th class="p-6">Category</th>
                <th class="p-6">Price</th>
                <th class="p-6">Stock</th>
                <th class="p-6">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-50">
              <tr v-for="product in productStore.items" :key="product.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="p-6 font-bold text-gray-900">{{ product.name }}</td>
                <td class="p-6"><span class="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold">{{
                    product.category }}</span></td>
                <td class="p-6 text-emerald-600 font-bold">{{ formatCurrency(product.price) }}</td>
                <td class="p-6">
                  <div class="flex items-center gap-2">
                    <div :class="['w-2 h-2 rounded-full', product.stock < 10 ? 'bg-red-500' : 'bg-emerald-500']"></div>
                    <span class="font-medium">{{ product.stock }} units</span>
                  </div>
                </td>
                <td class="p-6">
                  <div class="flex gap-4">
                    <button class="text-gray-400 hover:text-emerald-600 transition-colors"><svg class="w-5 h-5"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg></button>
                    <button class="text-gray-400 hover:text-red-500 transition-colors"><svg class="w-5 h-5" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/products';
import { formatCurrency } from '../utils/formatters';

const productStore = useProductStore();

const stats = [
  { label: 'Total Sales', value: '$45,280', trend: '12%', trendUp: true },
  { label: 'Avg Order', value: '$82.50', trend: '3%', trendUp: true },
  { label: 'Eco Items', value: '1,204', trend: '5%', trendUp: true },
  { label: 'Stock Alerts', value: '3', trend: '2', trendUp: false }
];
</script>