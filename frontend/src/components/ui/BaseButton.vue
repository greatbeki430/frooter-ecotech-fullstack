<template>
  <button 
    :class="[
      'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg' : '',
      variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : '',
      size === 'sm' ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-base'
    ]"
    :disabled="loading"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  loading: { type: Boolean, default: false }
});
</script>