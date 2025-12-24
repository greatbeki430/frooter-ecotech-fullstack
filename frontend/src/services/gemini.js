// src/services/gemini.js
export const getAiRecommendation = async (userQuery, products) => {
  // Logic: Send product list + query to Gemini API
  return "Based on your interest in Solar, I recommend the Solar Power Bank for its 95% eco-score.";
};

// src/services/stripe.js
export const createCheckoutSession = async cartItems => {
  console.log("Redirecting to Stripe with items:", cartItems);
  // Real implementation would call your backend to create a Stripe session
};

// src/services/supabase.js
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://your-url.supabase.co",
  "your-anon-key"
);
