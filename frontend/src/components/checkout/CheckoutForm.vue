<template>
  <div class="space-y-4">
    <input type="text" placeholder="Full Name"
      class="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 ring-emerald-500">
    <div class="grid grid-cols-2 gap-4">
      <input type="text" placeholder="City"
        class="p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 ring-emerald-500">
      <input type="text" placeholder="Zip" class="p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 ring-emerald-500">
    </div>
    <button
      class="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg hover:bg-emerald-700 transition-all">
      Continue to Payment
    </button>
  </div>
</template>