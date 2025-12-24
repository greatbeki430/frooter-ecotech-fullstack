<template>
  <footer class="bg-gray-900 text-white mt-20 relative overflow-hidden">
    <transition name="shutter">
      <div v-if="isNavigating" class="fixed inset-0 z-[200] bg-emerald-600 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
          <p class="text-white font-black tracking-widest uppercase animate-pulse text-xl">Filtering Catalog</p>
        </div>
      </div>
    </transition>

    <div class="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

      <div class="space-y-4">
        <h3
          class="text-2xl font-black text-emerald-500 tracking-tighter hover:scale-105 transition-transform cursor-default inline-block">
          EcoTechMart
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
          Join the revolution of sustainable technology. Every purchase plants a tree and reduces electronic waste.
        </p>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-100 uppercase text-xs tracking-widest">Shop</h4>
        <ul class="space-y-4">
          <li v-for="link in shopLinks" :key="link.name">
            <button @click="handleShopNavigation(link)"
              class="group flex items-center text-gray-400 hover:text-emerald-400 transition-all duration-300 text-left">
              <span
                class="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-emerald-500 font-bold">→</span>
              <span class="group-hover:translate-x-1 transition-transform">{{ link.name }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-100 uppercase text-xs tracking-widest">Support</h4>
        <ul class="space-y-4">
          <li v-for="policy in policies" :key="policy.title">
            <button @click="openPolicy(policy)"
              class="group flex items-center text-gray-400 hover:text-emerald-400 transition-all duration-300 text-left">
              <span
                class="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-emerald-500 font-bold">→</span>
              <span class="group-hover:translate-x-1 transition-transform">{{ policy.title }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-100 uppercase text-xs tracking-widest">Newsletter</h4>
        <div class="space-y-3">
          <div
            :class="['flex items-center p-1 bg-gray-800 rounded-xl border transition-all duration-500',
              isError ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-gray-700 focus-within:border-emerald-500']">

            <input v-model="email" type="email" placeholder="Enter your email"
              class="bg-transparent border-none focus:ring-0 text-white text-xs px-3 py-2 w-full outline-none placeholder:text-gray-500"
              @keyup.enter="handleSubscribe" />

            <button @click="handleSubscribe"
              class="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
              <span v-if="loading"
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ subscribeText }}
            </button>
          </div>
          <p class="text-[10px] text-gray-500 px-1 italic">Get 10% off your first eco-order.</p>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-800/50 mt-8">
      <div
        class="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p class="text-gray-500 text-[10px] uppercase tracking-widest font-medium">
          &copy; 2025 EcoTechMart &bull; Sustainable Future
        </p>

        <div class="flex flex-wrap justify-center md:justify-end gap-4 pr-0 md:pr-20">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-emerald-600 hover:text-white hover:-translate-y-2 transition-all duration-300 shadow-lg group"
            :title="social.name">
            <div class="w-5 h-5 group-hover:scale-110 transition-transform" v-html="social.icon"></div>
          </a>
        </div>
      </div>
    </div>

    <transition name="modal-fade">
      <div v-if="activePolicy" class="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-md" @click="activePolicy = null"></div>
        <div class="bg-white text-gray-900 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
          <div class="flex justify-between items-start mb-6">
            <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600"
              v-html="activePolicy.icon"></div>
            <button @click="activePolicy = null"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h3 class="text-2xl font-black mb-2">{{ activePolicy.title }}</h3>
          <p class="text-gray-600 leading-relaxed mb-8 text-sm">{{ activePolicy.content }}</p>
          <button @click="activePolicy = null"
            class="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors">
            Got it, thanks!
          </button>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const loading = ref(false);
const subscribeText = ref('Join');
const isError = ref(false);
const activePolicy = ref(null);
const isNavigating = ref(false);

const shopLinks = [
  { name: 'All Products', category: 'all' },
  { name: 'Solar Energy', category: 'Solar' },
  { name: 'Recycled Tech', category: 'Recycled' },
  { name: 'Low Carbon Items', category: 'Eco' }
];

const socialLinks = [
  {
    name: 'Github',
    url: 'https://github.com/greatbeki430',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/greatbek430/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
  },
  {
    name: 'X',
    url: 'https://x.com/BekeleGeza97785',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/keolbeki/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@keolbeki',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.72.42-1.12 1.21-1.22 2.03-.11.73.11 1.47.53 2.07.41.6 1.05.99 1.76 1.12.7.12 1.43-.01 2.04-.38.58-.33.99-.91 1.11-1.57.12-.76.12-1.52.12-2.29V.02z"/></svg>`
  }
];

const policies = [
  { title: 'Shipping Policy', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.447-.26-.852-.662-1.037l-3.321-1.523a1.125 1.125 0 00-1.154.067L15.75 10.5M1.5 5.25v9.75M4.5 5.25H12m0 0h3.375c.621 0 1.125.504 1.125 1.125v2.25"/></svg>`, content: 'We use 100% carbon-neutral shipping in biodegradable packaging. Delivery takes 3-5 days.' },
  { title: 'Eco-Guarantee', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296a3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21a3.745 3.745 0 01-3.068-.957a3.745 3.745 0 01-3.296-1.043a3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296a3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3a3.745 3.745 0 013.068.957a3.745 3.745 0 013.296 1.043a3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z"/></svg>`, content: 'Every product is certified sustainable. We offer 200% refunds on non-recyclable parts.' },
  { title: 'Easy Returns', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`, content: 'Changed your mind? Return any product within 30 days via our pre-paid recycling label.' }
];

const handleShopNavigation = (link) => {
  isNavigating.value = true;
  setTimeout(() => {
    router.push({ path: '/products', query: { filter: link.category } }).then(() => {
      window.scrollTo(0, 0);
      setTimeout(() => { isNavigating.value = false; }, 400);
    });
  }, 600);
};

const handleSubscribe = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    isError.value = true;
    setTimeout(() => isError.value = false, 500);
    return;
  }
  loading.value = true;
  subscribeText.value = 'Joining...';
  setTimeout(() => {
    loading.value = false;
    subscribeText.value = 'Success! 🎉';
    email.value = '';
    setTimeout(() => { subscribeText.value = 'Join'; }, 3000);
  }, 1500);
};

const openPolicy = (policy) => activePolicy.value = policy;
</script>

<style scoped>
.shutter-enter-active,
.shutter-leave-active {
  transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
}

.shutter-enter-from {
  transform: translateY(100%);
}

.shutter-leave-to {
  transform: translateY(-100%);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.border-red-500 {
  animation: shake 0.4s;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  75% {
    transform: translateX(5px);
  }
}
</style>