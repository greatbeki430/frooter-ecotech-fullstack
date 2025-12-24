import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Publishable Key from the Stripe Dashboard
const STRIPE_PUBLISHABLE_KEY = "pk_test_your_key_here";

/**
 * STRIPE SERVICE
 * This service handles the secure hand-off from our Eco-Tech shop
 * to Stripe's payment infrastructure.
 */
export const stripeService = {
  /**
   * Redirects the user to a secure Stripe Checkout page
   * @param {Array} cartItems - The list of products from Pinia store
   * @param {String} userEmail - The customer's email for pre-filling
   */
  async handleCheckout(cartItems, userEmail) {
    try {
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

      if (!stripe) throw new Error("Stripe failed to initialize.");

      // In a real "Big Project", you would call your backend (Node.js/Supabase)
      // to create a Session ID. Here is the architecture:

      /* const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, email: userEmail })
      });
      const session = await response.json();
      */

      // SIMULATION: For development, we log the intent
      console.log("💳 Initiating Stripe Checkout for:", cartItems);
      console.log("📧 Customer Email:", userEmail);

      // Trigger the redirect (This would normally use session.id)
      // const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      alert(
        "Redirecting to Stripe... (In production, this opens the Payment portal)"
      );

      return { success: true };
    } catch (error) {
      console.error("Stripe Checkout Error:", error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Formats cart data into Stripe-friendly line items
   */
  formatLineItems(cartItems) {
    return cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));
  },
};
