import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
// Import the new view
import ProductDetailView from "../views/ProductDetailView.vue";
import TrackOrderView from "../views/TrackOrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/products", name: "products", component: ProductsView },
    { path: "/cart", name: "cart", component: CartView },
    // NEW: Dynamic route for individual products
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
    },
    {
      path: "/track-order",
      name: "track-order",
      component: TrackOrderView,
    },
  ],
  // Ensure the page always scrolls to top when switching products
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
