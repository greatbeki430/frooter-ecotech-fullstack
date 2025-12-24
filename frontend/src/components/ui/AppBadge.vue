<template>
  <span
    :class="['px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border', variants[variant]]">
    <slot />
  </span>
</template>

<script setup>
const variants = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  warning: 'bg-amber-50 text-amber-700 border-amber-100',
  danger: 'bg-red-50 text-red-700 border-red-100',
  neutral: 'bg-gray-50 text-gray-600 border-gray-200'
};
defineProps({ variant: { default: 'success' } });
</script>