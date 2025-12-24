<template>
  <div v-if="isOpen" @click="closeAndReset"
    class="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity no-print">
  </div>

  <div :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    class="fixed top-0 right-0 h-full w-full md:w-[600px] bg-slate-50 border-l border-white/10 shadow-2xl z-50 transition-transform duration-500 ease-in-out flex flex-col">

    <div v-if="!isSuccess" class="p-8 border-b bg-white flex justify-between items-center no-print">
      <h2 class="font-black text-gray-900 uppercase tracking-tighter text-2xl">Terminal Cart</h2>
      <button @click="closeAndReset" class="p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all">✕</button>
    </div>

    <div class="flex-grow overflow-y-auto overflow-x-hidden relative scroll-smooth">

      <div v-if="!isProcessing && !isSuccess" class="p-8 space-y-6 no-print">
        <div v-for="item in cartStore.items" :key="item.id"
          class="flex gap-6 p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
          <img :src="item.image"
            class="w-32 h-32 object-cover rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-500" />
          <div class="flex-grow flex flex-col justify-between py-1">
            <div>
              <h4 class="text-lg font-black text-gray-900 leading-tight mb-1">{{ item.name }}</h4>
              <p class="text-lg text-emerald-600 font-bold">${{ item.price }}</p>
            </div>
            <div class="flex items-center border-2 border-gray-50 rounded-2xl w-max overflow-hidden bg-gray-50 mt-2">
              <button @click="cartStore.removeItem(item.id)"
                class="px-5 py-2 hover:bg-white hover:text-emerald-600 text-xl font-bold transition-all border-r border-gray-200">-</button>
              <span class="px-8 py-2 text-base font-black text-gray-800">{{ item.quantity }}</span>
              <button @click="cartStore.addItem(item)"
                class="px-5 py-2 hover:bg-white hover:text-emerald-600 text-xl font-bold transition-all">+</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isProcessing"
        class="absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 z-10 text-center no-print">
        <div class="w-20 h-20 border-[6px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-8">
        </div>
        <h3 class="font-black text-3xl text-gray-900 uppercase tracking-tighter">Authenticating Asset...</h3>
        <p class="text-gray-400 mt-4 font-medium uppercase tracking-widest text-xs">Please do not close the terminal</p>
      </div>

      <div v-if="isSuccess"
        class="min-h-full bg-slate-900 flex flex-col items-center p-8 md:p-12 z-20 animate-fade-in print-container">

        <div class="text-center mb-10 no-print">
          <h2 class="text-white text-3xl font-black uppercase tracking-tighter">Asset Secured</h2>
          <p class="text-emerald-400 text-xs font-bold uppercase tracking-[0.4em] mt-3 opacity-80">Electronic Ownership
            Log</p>
        </div>

        <div id="printable-area"
          class="relative w-full max-w-[480px] bg-white rounded-[3.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col shrink-0">

          <div class="bg-emerald-600 pt-12 pb-24 px-10 text-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center select-none">
              <span class="text-[120px] font-black -rotate-12 uppercase block">FROOTER</span>
            </div>
            <h1 class="text-white font-black uppercase tracking-[0.5em] text-[11px] relative z-10">Frooter Eco-Tech
              Systems</h1>
            <p
              class="text-emerald-100 font-mono text-[10px] uppercase tracking-[0.3em] mt-4 relative z-10 font-black border-t border-white/20 pt-4 inline-block">
              Ownership Certificate
            </p>
          </div>

          <div class="px-10 -translate-y-14 relative z-10">
            <div class="bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-50 flex flex-col items-center">
              <div class="w-20 h-2 bg-gray-100 rounded-full mb-6"></div>
              <p class="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Ref Number</p>
              <h3 class="text-3xl font-black text-gray-900 tracking-tighter leading-none">#{{ receiptData.id }}</h3>
            </div>
          </div>

          <div class="px-12 pb-10 flex-grow -mt-4">
            <h4
              class="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-8 border-b border-gray-100 pb-4">
              Hardware Inventory Log</h4>
            <div class="space-y-8">
              <div v-for="item in receiptData.items" :key="item.id" class="flex justify-between items-center">
                <div class="flex flex-col gap-1">
                  <span class="text-base font-black text-gray-900 uppercase tracking-tight">{{ item.name }}</span>
                  <span class="text-[11px] font-bold text-emerald-600 uppercase">Unit Allocation: {{ item.quantity
                  }}</span>
                </div>
                <span class="text-base font-black text-gray-400">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="mt-auto bg-slate-50 p-10 border-t border-dashed border-gray-200">
            <div class="flex justify-between items-end mb-10">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Market Value</span>
                <span class="text-4xl font-black text-gray-900 tracking-tighter">${{ receiptData.total }}</span>
              </div>
              <div
                class="w-20 h-20 bg-white p-2.5 rounded-[1.5rem] border border-gray-200 shadow-sm flex flex-wrap gap-1 items-center justify-center">
                <div v-for="n in 25" :key="n"
                  :class="['w-2 h-2 rounded-[2px]', Math.random() > 0.4 ? 'bg-gray-900' : 'bg-gray-100']"></div>
              </div>
            </div>

            <div class="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
              <div class="flex flex-col gap-1">
                <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Auth Timestamp</span>
                <span class="text-sm font-black text-gray-900">{{ receiptData.date }}</span>
              </div>
              <div class="flex gap-1.5 items-end h-10 pr-2">
                <div v-for="n in 24" :key="n"
                  :class="['w-[2.5px] bg-gray-900 rounded-full', Math.random() > 0.3 ? 'h-full' : 'h-1/2']"></div>
              </div>

            </div>
            <div
              class="pt-6 border-t border-gray-100 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
              <p class="text-[10px] font-black text-emerald-900 uppercase tracking-[0.3em]">Founder: Gezagn Bekele</p>
              <div class="flex gap-4 text-[9px] font-bold text-gray-500">
                <span>+251915379959</span>
                <span class="text-emerald-300">|</span>
                <span>+251961305788</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full max-w-[480px] space-y-4 my-12 no-print">
          <button @click="printReceipt"
            class="w-full py-6 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-[2.5rem] hover:bg-emerald-400 transition-all flex items-center justify-center gap-4 shadow-3xl shadow-emerald-500/40 text-base active:scale-95">
            <span>Generate Physical Asset Card</span>
          </button>
          <button @click="closeAndReset"
            class="w-full py-6 bg-white/5 text-white/60 font-black uppercase tracking-widest rounded-[2.5rem] hover:bg-white/10 hover:text-white transition-all text-base">
            Exit Terminal
          </button>
        </div>
      </div>
    </div>

    <div v-if="!isSuccess && !isProcessing" class="p-10 border-t bg-white shadow-2xl no-print">
      <div class="flex justify-between mb-8 items-end">
        <span class="font-bold text-gray-400 uppercase text-sm tracking-[0.3em]">Estimated Value</span>
        <span class="font-black text-5xl text-emerald-600 tracking-tighter">${{ cartStore.totalPrice }}</span>
      </div>
      <button @click="handleCheckout" :disabled="cartStore.items.length === 0" :class="[
        'w-full py-6 text-white font-black uppercase tracking-[0.3em] rounded-[2.5rem] transition-all duration-500 shadow-2xl transform active:scale-95 text-base',
        cartStore.items.length === 0 ? 'bg-gray-200 cursor-not-allowed text-gray-400' : 'bg-gray-900 hover:bg-emerald-600 hover:shadow-emerald-500/20'
      ]">
        Finalize Acquisition
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();

defineProps(['isOpen']);
const emit = defineEmits(['close']);

const isProcessing = ref(false);
const isSuccess = ref(false);

const receiptData = reactive({
  id: '',
  items: [],
  total: 0,
  date: ''
});

const handleCheckout = () => {
  if (cartStore.items.length === 0) return;

  receiptData.id = "FT-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  receiptData.items = [...cartStore.items];
  receiptData.total = cartStore.totalPrice;
  receiptData.date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    isSuccess.value = true;
  }, 2800);
};

const printReceipt = () => {
  window.print();
};

const closeAndReset = () => {
  emit('close');
  setTimeout(() => {
    if (isSuccess.value) {
      cartStore.items = [];
      cartStore.saveToLocal();
    }
    isSuccess.value = false;
    isProcessing.value = false;
  }, 400);
};
</script>

<style scoped>
/* =========================
   PERFECT PRINT BEHAVIOR
========================= */
@media print {

  /* Physical page config */
  @page {
    size: A4;
    margin: 0;
  }

  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Hide EVERYTHING first */
  body * {
    visibility: hidden !important;
  }

  /* Show only success + card */
  .print-container,
  .print-container * {
    visibility: visible !important;
  }

  /* White isolated page so nothing bleeds */
  .print-container {
    position: fixed !important;
    inset: 0 !important;
    background: #ffffff !important;

    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;

    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* ======== THE CARD ======== */
  #printable-area {
    transform-origin: top center !important;
    transform: scale(1.1) !important;
    /* <-- Ensures ONE PAGE always */

    page-break-before: avoid !important;
    page-break-after: avoid !important;
    page-break-inside: avoid !important;

    box-shadow: none !important;
  }

  #printable-area * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Hide action buttons / overlays */
  .no-print {
    display: none !important;
  }
}

/* =========================
   NORMAL UI STYLES
========================= */

/* UI Animations */
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar */
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
