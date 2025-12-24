<template>
  <div class="min-h-screen bg-slate-50 py-12 md:py-24">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="grid lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-white">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">📦</div>
              <div>
                <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tighter">Track Shipment</h1>
                <p class="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Real-time Logistics Monitoring
                </p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 mb-12">
              <input v-model="trackingId" @keyup.enter="findOrder" type="text" placeholder="ORDER ID (e.g. ECO-2025)"
                class="flex-grow px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 font-black uppercase tracking-widest outline-none transition-all" />
              <button @click="findOrder" :disabled="isLoading"
                class="px-8 py-4 bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                <span v-if="isLoading"
                  class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ isLoading ? 'Searching' : 'Track' }}
              </button>
            </div>

            <div v-if="orderStatus && !isLoading" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div
                class="flex flex-wrap justify-between items-center bg-emerald-600 rounded-[2rem] p-6 text-white mb-10">
                <div>
                  <p class="text-[9px] font-black uppercase opacity-80 tracking-widest">Estimated Delivery</p>
                  <p class="text-2xl font-black italic">{{ orderStatus.eta }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[9px] font-black uppercase opacity-80 tracking-widest">Current Location</p>
                  <p class="text-lg font-bold">Distribution Center - Berlin, DE</p>
                </div>
              </div>

              <div class="relative py-4 ml-2">
                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div class="space-y-10 relative">
                  <div v-for="(step, index) in steps" :key="index" class="flex items-start gap-6">
                    <div :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black z-10',
                      step.completed ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-300'
                    ]">
                      {{ step.completed ? '✓' : index + 1 }}
                    </div>
                    <div class="flex-grow">
                      <div class="flex justify-between">
                        <p
                          :class="['font-black uppercase tracking-tighter text-sm', step.completed ? 'text-gray-900' : 'text-gray-300']">
                          {{ step.label }}
                        </p>
                        <span class="text-[10px] font-bold text-gray-400 uppercase">{{ step.date }}</span>
                      </div>
                      <p v-if="step.completed" class="text-[11px] text-gray-400 mt-1">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="!isLoading" class="py-12 text-center opacity-20">
              <p class="font-black uppercase tracking-[0.3em] text-sm">Waiting for valid ID...</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="orderStatus"
            class="bg-white rounded-[3rem] p-8 shadow-sm border border-white animate-in fade-in slide-in-from-right-4 duration-700">
            <h3 class="text-lg font-black uppercase tracking-tighter mb-6 italic">Package Contents</h3>
            <div class="space-y-4 mb-8">
              <div v-for="item in mockItems" :key="item.id" class="flex items-center gap-4">
                <img :src="item.image" class="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p class="text-[11px] font-black text-gray-900 uppercase leading-none">{{ item.name }}</p>
                  <p class="text-[10px] text-gray-400 font-bold uppercase mt-1">Qty: 1</p>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-3">
              <button
                class="w-full py-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Reschedule</button>
              <button
                class="w-full py-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Report
                Issue</button>
            </div>
          </div>

          <div class="bg-gray-900 rounded-[3rem] p-8 text-white relative overflow-hidden">
            <div class="relative z-10">
              <div class="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Eco-Impact Report</div>
              <p class="text-xl font-black italic leading-tight mb-4">Your delivery has been carbon-offset.</p>
              <div class="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
                <span class="text-2xl">🌳</span>
                <p class="text-[10px] font-bold uppercase leading-relaxed text-emerald-100">
                  This shipment contributed to the reforestation of the Amazon Basin.
                </p>
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 opacity-10 text-7xl italic font-black">ECO</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const trackingId = ref('');
const orderStatus = ref(null);
const isLoading = ref(false);

const mockItems = [
  { id: 1, name: 'Solar Power Bank', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=100' },
  { id: 2, name: 'Bamboo Stand', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100' }
];

const steps = ref([
  { label: 'Order Confirmed', date: 'Dec 22', completed: true, desc: 'Payment verified and secured.' },
  { label: 'Sustainability Check', date: 'Dec 23', completed: true, desc: 'Eco-score 98 verified.' },
  { label: 'In Transit', date: 'Dec 24', completed: true, desc: 'Handed over to Carbon-Neutral Carrier.' },
  { label: 'Out for Delivery', date: 'Dec 25', completed: false, desc: 'Local courier assigned.' },
]);

const findOrder = () => {
  if (!trackingId.value) return;
  isLoading.value = true;
  orderStatus.value = null;

  setTimeout(() => {
    isLoading.value = false;
    if (trackingId.value.length >= 4) {
      orderStatus.value = { current: 'In Transit', eta: 'Dec 27, 2025' };
    }
  }, 1000);
};
</script>