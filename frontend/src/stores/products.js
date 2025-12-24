import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("products", () => {
  // 1. State: Complete Original Inventory
  const items = ref([
    {
      id: 1,
      name: "Solar Power Bank",
      price: 45.0,
      category: "Solar",
      stock: 15,
      rating: 4.8,
      reviews: 124,
      description:
        "High-efficiency monocrystalline solar panels with 20,000mAh capacity.",
      ecoScore: 95,
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Smart Energy Monitor",
      price: 89.99,
      category: "Home",
      stock: 12,
      rating: 4.6,
      reviews: 89,
      description: "Real-time energy consumption tracker with AI insights.",
      ecoScore: 88,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Portable Power Station",
      price: 299.0,
      category: "Solar",
      stock: 8,
      rating: 4.9,
      reviews: 56,
      description:
        "High-capacity 500Wh portable power station, rechargeable via solar panels for off-grid living.",
      ecoScore: 98,
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Bamboo Keyboard",
      price: 65.0,
      category: "Office",
      stock: 8,
      rating: 4.4,
      reviews: 67,
      description: "Sustainable bamboo mechanical keyboard.",
      ecoScore: 85,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Wind Turbine Kit",
      price: 120.0,
      category: "Solar",
      stock: 5,
      rating: 4.7,
      reviews: 42,
      description: "Portable wind turbine for off-grid power.",
      ecoScore: 96,
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Recycled Backpack",
      price: 75.0,
      category: "Lifestyle",
      stock: 18,
      rating: 4.5,
      reviews: 112,
      description: "Backpack made from recycled ocean plastics.",
      ecoScore: 90,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Solar Garden Lights",
      price: 29.99,
      category: "Garden",
      stock: 25,
      rating: 4.3,
      reviews: 78,
      description: "Weather-resistant solar-powered LED garden lights.",
      ecoScore: 87,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Electric Bike",
      price: 899.0,
      category: "Transport",
      stock: 3,
      rating: 4.9,
      reviews: 56,
      description: "Foldable electric bike with 50km range.",
      ecoScore: 94,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
    },
    {
      id: 9,
      name: "Solar Smart Watch",
      price: 199.0,
      category: "Lifestyle",
      stock: 12,
      rating: 4.8,
      reviews: 94,
      description:
        "Advanced fitness tracking powered by integrated solar harvesting technology.",
      ecoScore: 96,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
    },
    {
      id: 10,
      name: "Solar Phone Charger",
      price: 39.99,
      category: "Solar",
      stock: 22,
      rating: 4.7,
      reviews: 187,
      description: "Ultra-fast solar phone charger with dual ports.",
      ecoScore: 93,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop",
    },
    {
      id: 11,
      name: "Bamboo Laptop Stand",
      price: 42.5,
      category: "Office",
      stock: 10,
      rating: 4.5,
      reviews: 63,
      description: "Ergonomic bamboo laptop stand for home office.",
      ecoScore: 86,
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
    },
    {
      id: 12,
      name: "Reusable Food Wraps",
      price: 24.99,
      category: "Lifestyle",
      stock: 30,
      rating: 4.8,
      reviews: 145,
      description: "Bee wax food wraps, eco-friendly alternative to plastic.",
      ecoScore: 89,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop",
    },
  ]);

  const searchQuery = ref("");
  const activeCategory = ref("all");

  // 2. Getters (Computed)
  const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    return items.value.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory.value === "all" || p.category === activeCategory.value;
      return matchesSearch && matchesCategory;
    });
  });

  // 3. Actions
  const getRecommendations = productId => {
    const currentProduct = items.value.find(p => p.id === productId);
    if (!currentProduct) return [];
    return items.value
      .filter(p => p.category === currentProduct.category && p.id !== productId)
      .slice(0, 3);
  };

  const rateProduct = (productId, newRating) => {
    const product = items.value.find(p => p.id === productId);
    if (product) {
      const totalReviews = product.reviews || 0;
      const currentRating = product.rating || 0;
      const updatedRating =
        (currentRating * totalReviews + newRating) / (totalReviews + 1);
      product.rating = Number(updatedRating.toFixed(1));
      product.reviews = totalReviews + 1;
    }
  };

  return {
    items,
    searchQuery,
    activeCategory,
    filteredProducts,
    getRecommendations,
    rateProduct,
  };
});
