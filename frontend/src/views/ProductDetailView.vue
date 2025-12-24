<template>
  <div class="min-h-screen bg-slate-50 py-12">
    <div v-if="product" class="container mx-auto px-6">
      <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
        <router-link to="/products" class="hover:text-emerald-600 transition-colors">Shop</router-link>
        <span>/</span>
        <span class="text-emerald-600">{{ product.category }}</span>
      </nav>

      <div
        class="flex flex-col lg:flex-row gap-16 bg-white p-8 lg:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white mb-20">
        <div class="lg:w-1/2">
          <div class="sticky top-24 rounded-[2rem] overflow-hidden shadow-2xl group">
            <img :src="product.image" :alt="product.name"
              class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
        </div>

        <div class="lg:w-1/2 space-y-8">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                Eco-Score: {{ product.ecoScore || 90 }}
              </span>

              <div class="flex flex-col items-end">
                <div class="flex items-center gap-1">
                  <button v-for="star in 5" :key="star" @click="handleRating(star)" :disabled="userHasRated"
                    class="text-xl transition-all duration-300" :class="[
                      star <= Math.round(product.rating || 4.5) ? 'text-amber-400' : 'text-gray-200',
                      !userHasRated ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
                    ]">
                    ★
                  </button>
                  <span class="text-gray-900 ml-2 font-black text-sm">{{ product.rating || '4.5' }}</span>
                </div>
                <p v-if="userHasRated" class="text-[9px] text-emerald-600 font-black uppercase mt-1 animate-pulse">
                  Feedback Received!
                </p>
              </div>
            </div>

            <h1 class="text-5xl font-black text-gray-900 tracking-tighter mb-4">{{ product.name }}</h1>

            <div class="flex items-center gap-4">
              <span class="text-3xl font-black text-emerald-600">${{ product.price }}</span>
              <span class="text-gray-400 text-sm font-medium">({{ product.stock || 10 }} units left)</span>
            </div>
          </div>

          <p class="text-gray-600 leading-relaxed text-lg italic">
            {{ product.description || 'Join the movement towards a sustainable future.' }}
          </p>

          <div class="space-y-4">
            <button @click="cartStore.addItem(product)"
              class="w-full py-5 bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-xl">
              Add to Shopping Cart
            </button>

            <div class="flex justify-center gap-6 pt-4 border-t border-gray-100">
              <a href="#" class="social-link">Instagram</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">LinkedIn</a>
            </div>
          </div>

          <div class="pt-8">
            <div class="flex border-b border-gray-100 mb-6 gap-8">
              <button v-for="tab in ['Specs', 'Eco-Impact', 'Shipping']" :key="tab" @click="activeTab = tab"
                :class="activeTab === tab ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-400'"
                class="pb-2 font-black uppercase text-[10px] tracking-widest transition-all">
                {{ tab }}
              </button>
            </div>

            <div class="text-sm text-gray-500 leading-relaxed min-h-[80px]">
              <div v-if="activeTab === 'Specs'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <ul class="grid grid-cols-2 gap-4">
                  <li><strong>Weight:</strong> 1.2kg</li>
                  <li><strong>Material:</strong> Recycled Polymer</li>
                  <li><strong>Warranty:</strong> 2 Years</li>
                  <li><strong>Origin:</strong> Carbon Neutral Lab</li>
                </ul>
              </div>
              <div v-if="activeTab === 'Eco-Impact'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p>This {{ product.name }} saves approximately 4.5kg of CO2 emissions.</p>
              </div>
              <div v-if="activeTab === 'Shipping'" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p>Free carbon-neutral shipping on all orders over $50.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="recommendations.length" class="mt-20">
        <h3 class="text-2xl font-black uppercase tracking-tighter mb-10 italic">Recommended For You</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in recommendations" :key="item.id"
            class="group bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all border border-white">
            <router-link :to="'/product/' + item.id">
              <img :src="item.image" class="w-full h-48 object-cover rounded-[2rem] mb-4">
              <div class="px-2">
                <h4 class="font-bold text-gray-800">{{ item.name }}</h4>
                <p class="text-emerald-600 font-black">${{ item.price }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-20">
        <h3 class="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic">Community Feedback</h3>
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="n in 2" :key="n" class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center font-black text-emerald-600">
                {{ n === 1 ? 'JD' : 'AS' }}
              </div>
              <div>
                <p class="font-black text-gray-900 text-sm">{{ n === 1 ? 'Jane Doe' : 'Alex Smith' }}</p>
                <div class="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>
            <p class="text-gray-500 italic leading-relaxed">
              "Absolutely obsessed with the quality. It's rare to find a professional project that balances high-tech
              features with actual sustainability so well."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useProductStore } from '../stores/products';
import { computed, onMounted, ref } from 'vue';

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

const activeTab = ref('Specs');
const userHasRated = ref(false);

const product = computed(() => {
  const urlId = Number(route.params.id);
  return productStore.items.find(p => p.id === urlId);
});

const recommendations = computed(() => {
  return productStore.getRecommendations(product.value?.id);
});

const handleRating = (score) => {
  if (userHasRated.value) return;
  if (productStore.rateProduct) {
    productStore.rateProduct(product.value.id, score);
    userHasRated.value = true;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.social-link {
  @apply text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition-colors;
}
</style>