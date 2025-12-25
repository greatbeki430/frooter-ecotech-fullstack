<template>
  <div class="bg-white">
    <!-- Mission Modal -->
    <div v-if="showMissionModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="closeMissionModal">
      <div class="relative bg-white rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-hidden animate-modal-in">
        <!-- Close Button -->
        <button @click="closeMissionModal"
          class="absolute top-6 right-6 z-10 p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all">
          ✕
        </button>

        <!-- Modal Header -->
        <div class="bg-emerald-600 p-12 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <span class="text-[120px] font-black -rotate-12 uppercase">FROOTER</span>
          </div>
          <h2 class="text-white text-3xl font-black uppercase tracking-tighter relative z-10">Our Mission</h2>
          <p class="text-emerald-100 text-sm font-medium mt-4 relative z-10">
            Building a sustainable future through technology
          </p>
        </div>

        <!-- Modal Content -->
        <div class="p-12 overflow-y-auto max-h-[60vh]">
          <div class="space-y-8">
            <!-- Mission Statement -->
            <div class="text-center mb-8">
              <h3 class="text-2xl font-black text-gray-900 mb-4">Tech That Cares</h3>
              <p class="text-gray-600 leading-relaxed">
                At Frooter Eco-Tech Systems, we believe technology should exist in harmony with nature.
                Our mission is to create high-performance eco-tech solutions that don't compromise on quality or the
                planet.
              </p>
            </div>

            <!-- Core Values -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="value in coreValues" :key="value.title"
                class="bg-slate-50 p-6 rounded-[2rem] border border-gray-100">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <span class="text-2xl">{{ value.icon }}</span>
                  </div>
                  <h4 class="text-lg font-black text-gray-900">{{ value.title }}</h4>
                </div>
                <p class="text-gray-600 text-sm">{{ value.description }}</p>
              </div>
            </div>

            <!-- Environmental Impact -->
            <div class="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100">
              <h4 class="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2">
                <span>🌍</span> Environmental Impact
              </h4>
              <div class="grid grid-cols-2 gap-6">
                <div v-for="impact in environmentalImpact" :key="impact.label"
                  class="text-center p-4 bg-white rounded-2xl">
                  <p class="text-2xl font-black text-emerald-600">{{ impact.value }}</p>
                  <p class="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">{{ impact.label }}</p>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center pt-8 border-t border-gray-200">
              <p class="text-gray-600 mb-6">
                Join us in creating a sustainable future. Every purchase supports our environmental initiatives.
              </p>
              <router-link to="/products" @click="closeMissionModal"
                class="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-500 transition-all">
                <span>Shop Sustainable Tech</span>
                <span>→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-32 pb-16 lg:py-24">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg class="h-full w-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div class="container mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center relative z-10">

        <div class="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live: The 2025 Eco-Registry
          </div>

          <h1 class="text-5xl md:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter italic">
            TECH FOR <br />
            <span class="text-emerald-600">GOOD.</span> <br />
            PERIOD.
          </h1>

          <p class="text-gray-500 text-lg max-w-md font-medium leading-relaxed">
            We’ve reimagined everyday essentials using 100% recycled ocean plastic and bio-based polymers. High
            performance, zero footprint.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/products"
              class="px-10 py-5 bg-gray-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-center">
              Shop Collection
            </router-link>
            <button @click="showMissionModal = true"
              class="px-10 py-5 bg-white text-gray-900 border border-gray-200 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
              Our Vision
            </button>
          </div>

          <div class="pt-8 flex flex-wrap gap-x-8 gap-y-4 items-center border-t border-gray-100">
            <div v-for="badge in ['Carbon Neutral', '1% For Planet', 'Bio-Based']" :key="badge"
              class="text-[9px] font-black uppercase tracking-tighter text-gray-400 flex items-center gap-2">
              <span class="w-1 h-1 bg-emerald-500 rounded-full"></span> {{ badge }}
            </div>
          </div>
        </div>

        <div class="relative group mt-10 lg:mt-0">
          <div
            class="absolute -inset-10 bg-emerald-100/40 rounded-full blur-3xl group-hover:bg-emerald-200/40 transition-colors duration-1000">
          </div>

          <div
            class="relative rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transform transition-transform duration-700 group-hover:scale-[1.01]">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200"
              class="w-full aspect-[4/5] lg:aspect-square object-cover" alt="Minimalist Sustainable Product" />
            <div class="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Material</p>
              <p class="text-lg font-black text-gray-900 tracking-tighter">100% Recycled</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-gray-900">
      <div class="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-3xl font-black text-white">{{ stat.value }}</p>
          <p class="text-emerald-500 text-[10px] font-black uppercase tracking-widest">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section class="py-24 container mx-auto px-6">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">Top Categories</h2>
          <p class="text-gray-500 font-medium">Find what fits your eco-lifestyle</p>
        </div>
        <router-link to="/products"
          class="text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:underline">View
          All</router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="cat in categories" :key="cat.name" @click="goToCategory(cat.name)"
          class="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer">
          <img :src="cat.image"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-8 left-8">
            <h3 class="text-white text-2xl font-black uppercase tracking-tighter italic">{{ cat.name }}</h3>
            <p class="text-emerald-400 text-xs font-bold uppercase tracking-widest">Shop Collection →</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-50">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-black text-gray-900 uppercase tracking-tighter italic mb-12 text-center">Trending Now
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="product in featuredProducts" :key="product.id"
            class="group bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-white">
            <router-link :to="'/product/' + product.id" class="block overflow-hidden rounded-[2rem] mb-4">
              <img :src="product.image"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
            </router-link>
            <div class="px-2">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-bold text-gray-800 leading-tight">{{ product.name }}</h3>
                <span class="text-emerald-600 font-black">${{ product.price }}</span>
              </div>
              <button @click="cartStore.addItem(product)"
                class="w-full py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all active:scale-95">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 container mx-auto px-6">
      <div class="bg-emerald-600 rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 p-12 opacity-10 text-[200px] font-black italic select-none">ECO</div>
        <h2 class="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 relative z-10">Join the movement.
        </h2>
        <p class="text-emerald-100 text-lg mb-10 max-w-xl mx-auto font-medium">Get 15% off your first order and
          exclusive access to zero-waste tech drops.</p>

        <form @submit.prevent class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
          <input type="email" placeholder="Email Address"
            class="flex-grow px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white transition-all" />
          <button
            class="px-10 py-5 bg-white text-emerald-700 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-50 transition-all">
            Join
          </button>
        </form>

        <div class="mt-12 flex justify-center gap-8">
          <a v-for="social in ['Instagram', 'Twitter', 'LinkedIn', 'Facebook']" :key="social" href="#"
            class="text-[10px] font-black uppercase tracking-widest hover:text-gray-900 transition-colors">
            {{ social }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/products';
import { useCartStore } from '../stores/cart';

const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const showMissionModal = ref(false);

const featuredProducts = computed(() => {
  return productStore.items.slice(0, 4);
});

const stats = [
  { label: 'CO2 Saved', value: '45.2 Tons' },
  { label: 'Trees Planted', value: '12,400+' },
  { label: 'Recycled Plastic', value: '8.4 Tons' },
  { label: 'Eco-Score Avg', value: '94%' },
];

const categories = [
  { name: 'Solar', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format' },
  { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format' },
  { name: 'Office', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&auto=format' },
];

const coreValues = [
  {
    icon: '♻️',
    title: 'Circular Economy',
    description: 'Every product is designed for disassembly, repair, and recycling to minimize waste.'
  },
  {
    icon: '🌱',
    title: 'Sustainable Materials',
    description: 'We use only recycled, biodegradable, or rapidly renewable materials in our products.'
  },
  {
    icon: '⚡',
    title: 'Clean Energy',
    description: 'All our manufacturing facilities run on 100% renewable solar and wind energy.'
  },
  {
    icon: '🤝',
    title: 'Ethical Practices',
    description: 'Fair wages, safe working conditions, and transparent supply chains are non-negotiable.'
  },
];

const environmentalImpact = [
  { label: 'Plastic Removed', value: '8.4T' },
  { label: 'Carbon Offset', value: '45.2T' },
  { label: 'Trees Planted', value: '12.4K' },
  { label: 'Ocean Cleanup', value: '22K lbs' },
];

const goToCategory = (catName) => {
  productStore.activeCategory = catName;
  router.push('/products');
};

const closeMissionModal = () => {
  showMissionModal.value = false;
};

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && showMissionModal.value) {
    closeMissionModal();
  }
});
</script>

<style scoped>
/* Smooth slide-in animations */
.animate-in {
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-in-from-left-8 {
  from {
    transform: translateX(-2rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Modal animation */
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-in {
  animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Prevent scroll when modal is open */
body:has(div[class*="fixed"][class*="inset-0"][class*="z-[100]"]) {
  overflow: hidden;
}
</style>