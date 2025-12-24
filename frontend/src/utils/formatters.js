/**
 * Formats a number into a currency string ($45.00)
 */
export const formatCurrency = value => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

/**
 * Formats a raw date string into a readable format (Dec 24, 2025)
 */
export const formatDate = dateString => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Calculates the estimated delivery date (3 days from now)
 */
export const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return formatDate(date);
};
