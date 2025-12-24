<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
        <div class="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl">
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>