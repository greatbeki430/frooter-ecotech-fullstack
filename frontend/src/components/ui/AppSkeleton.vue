<template>
  <div class="animate-pulse bg-gray-200 rounded-2xl w-full h-full min-h-[200px]">
    <div
      class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]">
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>