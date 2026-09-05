/**
 * ACE CENTRAL COIN ECONOMY CONFIGURATION
 * SINGLE SOURCE OF TRUTH FOR THE ENTIRE PLATFORM
 *
 * STRICT RULE:
 * 100 COINS = ₹1.00 INR
 * 1 COIN     = ₹0.01 INR
 */

export const COINS_PER_INR = 100;
export const COINS_PER_RUPEE = 100; // Alias for consistency
export const INR_PER_COIN = 0.01;
export const MINIMUM_REDEMPTION_COINS = 1000; // 1,000 Coins = ₹10.00
export const DAILY_EARNING_COIN_LIMIT = 5000; // 5,000 Coins = ₹50.00 / day

/**
 * Converts integer coins to INR Rupees (e.g. 5000 -> 50)
 */
export function coinsToINR(coins: number): number {
  if (typeof coins !== 'number' || isNaN(coins)) return 0;
  return coins / COINS_PER_INR;
}

export function calculateCoinsToRupees(coins: number): number {
  return coinsToINR(coins);
}

/**
 * Converts INR Rupees to integer coins (e.g. 499 -> 49900)
 */
export function inrToCoins(inr: number): number {
  if (typeof inr !== 'number' || isNaN(inr)) return 0;
  return Math.round(inr * COINS_PER_INR);
}

/**
 * Formats coins into exact Indian Rupee representation (e.g. 5000 -> "₹50.00")
 */
export function formatCoinsToRupees(coins: number): string {
  const inr = coinsToINR(coins);
  return `₹${inr.toLocaleString('en-IN', { minimumFractionDigits: inr % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

export function formatCoinsToINR(coins: number): string {
  return formatCoinsToRupees(coins);
}

/**
 * Verifiable conversion scale for documentation and calculators
 */
export const COIN_CONVERSION_SCALE = [
  { coins: 1, inr: 0.01, formatted: '₹0.01' },
  { coins: 10, inr: 0.10, formatted: '₹0.10' },
  { coins: 50, inr: 0.50, formatted: '₹0.50' },
  { coins: 100, inr: 1.00, formatted: '₹1.00' },
  { coins: 250, inr: 2.50, formatted: '₹2.50' },
  { coins: 500, inr: 5.00, formatted: '₹5.00' },
  { coins: 1000, inr: 10.00, formatted: '₹10.00' },
  { coins: 2000, inr: 20.00, formatted: '₹20.00' },
  { coins: 5000, inr: 50.00, formatted: '₹50.00' },
  { coins: 10000, inr: 100.00, formatted: '₹100.00' },
  { coins: 25000, inr: 250.00, formatted: '₹250.00' },
  { coins: 50000, inr: 500.00, formatted: '₹500.00' },
  { coins: 100000, inr: 1000.00, formatted: '₹1,000.00' },
];
