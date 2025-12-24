import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    // Load from local storage on startup
    items: JSON.parse(localStorage.getItem("cart_items")) || [],
    isDrawerOpen: false, // <-- ADDED THIS: Controls the sidebar visibility
  }),
  actions: {
    addItem(product) {
      const existing = this.items.find(i => i.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }

      // Open the side drawer automatically when an item is added
      this.isDrawerOpen = true;

      this.saveToLocal();
    },
    removeItem(id) {
      const index = this.items.findIndex(i => i.id === id);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
      this.saveToLocal();
    },
    // Useful for a "Close" button or background click
    toggleDrawer(status) {
      this.isDrawerOpen = status;
    },
    saveToLocal() {
      localStorage.setItem("cart_items", JSON.stringify(this.items));
    },
  },
  getters: {
    totalItems: state => state.items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: state =>
      state.items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2),
  },
});
