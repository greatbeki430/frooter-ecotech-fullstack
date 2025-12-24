import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    profile: null,
    wishlist: [],
  }),
  actions: {
    toggleWishlist(productId) {
      const index = this.wishlist.indexOf(productId);
      if (index > -1) this.wishlist.splice(index, 1);
      else this.wishlist.push(productId);
    },
  },
});
