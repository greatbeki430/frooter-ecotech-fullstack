<template>
  <div class="fixed bottom-6 right-6 z-[100]">
    <button @click="isOpen = !isOpen"
      class="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span v-else class="text-2xl font-bold">×</span>
    </button>

    <transition name="chat-slide">
      <div v-if="isOpen"
        class="absolute bottom-20 right-0 w-80 h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        <div class="bg-emerald-600 p-4 text-white font-bold flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span>Eco AI Assistant</span>
          </div>
          <span class="text-[10px] uppercase tracking-widest opacity-70">Online</span>
        </div>

        <div ref="chatBox" class="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 scroll-smooth">
          <div v-for="msg in messages" :key="msg.id"
            :class="['max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed transition-all duration-300',
              msg.isUser ? 'bg-emerald-600 ml-auto text-white rounded-tr-none shadow-md' : 'bg-white border border-gray-100 mr-auto text-gray-800 rounded-tl-none shadow-sm']">
            {{ msg.text }}
          </div>

          <div v-if="isTyping"
            class="bg-white border border-gray-100 mr-auto p-3 rounded-2xl rounded-tl-none shadow-sm w-12 flex justify-center gap-1">
            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>

        <div class="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Ask about solar, recycling..."
            class="flex-grow text-sm p-3 outline-none border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-gray-50 text-gray-900 placeholder:text-gray-400">
          <button @click="sendMessage"
            class="bg-gray-900 hover:bg-emerald-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
            :disabled="!userInput.trim()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);
const userInput = ref('');
const isTyping = ref(false);
const chatBox = ref(null);

// 1. Expanded Knowledge Base with Deep Context
const knowledgeBase = {
  solar: {
    keywords: ['solar', 'sun', 'panel', 'energy', 'power', 'battery'],
    response: "Our solar collection features Tier-1 monocrystalline panels with a 22.5% efficiency rating—well above the industry average. \n\nFeatured Product: The 'Helios Portable 500' is currently trending. It's built from reclaimed ocean plastic and can fully charge a smartphone 40 times on a single day of sunlight. Would you like to view our Solar category?",
    action: '/products?filter=Solar'
  },
  recycling: {
    keywords: ['recycle', 'waste', 'old', 'trash', 'dispose', 'broken'],
    response: "We operate a 'Circular Economy' model. Unlike traditional stores, we take back any tech bought from us (or elsewhere!) to be refurbished or harvested for parts. \n\nImpact: Last year, we diverted 12 tons of e-waste from landfills. If you send us an old device, we'll email you a 15% discount voucher instantly.",
    action: null
  },
  shipping: {
    keywords: ['shipping', 'delivery', 'track', 'arrive', 'fast', 'package'],
    response: "Sustainability doesn't stop at the product. We use carbon-neutral shipping via electric van fleets in urban areas. \n\nPackaging: Your order will arrive in 100% compostable 'Mushroom Packaging'—it dissolves in water or can be used as garden fertilizer!",
    action: null
  },
  brand: {
    keywords: ['who', 'about', 'company', 'ecotechmart', 'mission'],
    response: "EcoTechMart was founded in 2024 with one goal: making high-performance tech guilt-free. For every $100 spent, we plant 5 trees through our partnership with 'Eden Reforestation Projects'. We are currently a B-Corp applicant.",
    action: null
  }
};

const messages = ref([
  { id: 1, text: "Hello! I'm your Eco-Guide. I can provide deep insights into our solar tech, carbon-neutral shipping, or our zero-waste mission. What can I explain for you today?", isUser: false }
]);

const scrollToBottom = async () => {
  await nextTick();
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

// 2. Advanced Logic for Contextual Matching
const sendMessage = async () => {
  const input = userInput.value.trim().toLowerCase();
  if (!input) return;

  messages.value.push({ id: Date.now(), text: userInput.value, isUser: true });
  userInput.value = '';
  scrollToBottom();

  isTyping.value = true;

  setTimeout(() => {
    isTyping.value = false;
    let foundMatch = null;

    // Search through the knowledge base
    for (const key in knowledgeBase) {
      if (knowledgeBase[key].keywords.some(k => input.includes(k))) {
        foundMatch = knowledgeBase[key];
        break;
      }
    }

    if (foundMatch) {
      messages.value.push({ id: Date.now() + 1, text: foundMatch.response, isUser: false });

      // If the match has a specific action (like a link), suggest it
      if (foundMatch.action) {
        setTimeout(() => {
          messages.value.push({
            id: Date.now() + 2,
            text: "💡 Tip: I can take you directly to that section if you'd like!",
            isUser: false,
            isAction: true,
            link: foundMatch.action
          });
          scrollToBottom();
        }, 800);
      }
    } else {
      messages.value.push({
        id: Date.now() + 1,
        text: "I couldn't find a specific match for that, but I can tell you that all our products meet the 'Eco-Standard Gold' certification. Try asking about 'Solar', 'Recycling', or 'Our Mission'!",
        isUser: false
      });
    }
    scrollToBottom();
  }, 1000);
};

const handleActionClick = (path) => {
  isOpen.value = false;
  router.push(path);
};

watch(isOpen, (val) => val && scrollToBottom());
</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

/* Custom Scrollbar for the chat box */
div::-webkit-scrollbar {
  width: 4px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>