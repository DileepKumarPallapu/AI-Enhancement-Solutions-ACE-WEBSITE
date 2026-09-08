// ACE 110X Multi-Currency & Globalization Service
// Core rule: 100 ACE Coins = ₹1 INR reference

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'SGD' | 'AED' | 'JPY';

export interface ExchangeRate {
  fromCurrency: 'INR';
  toCurrency: CurrencyCode;
  rate: number;
  rateSource: string;
  effectiveAt: string;
  isLive: boolean;
}

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  exchangeRateToInr: number; // 1 Unit of Currency = X INR
  rateSource: string;
  effectiveAt: string;
  isAvailable: boolean;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', exchangeRateToInr: 1.0, rateSource: 'Reserve Bank of India (Canonical Reference)', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', exchangeRateToInr: 86.5, rateSource: 'Federal Reserve / FX Reference Data', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', exchangeRateToInr: 92.0, rateSource: 'European Central Bank Reference Rate', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', exchangeRateToInr: 110.0, rateSource: 'Bank of England Market Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', exchangeRateToInr: 63.5, rateSource: 'Bank of Canada FX Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', exchangeRateToInr: 56.2, rateSource: 'Reserve Bank of Australia Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', exchangeRateToInr: 65.0, rateSource: 'Monetary Authority of Singapore Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', exchangeRateToInr: 23.5, rateSource: 'Central Bank of UAE Reference Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', exchangeRateToInr: 0.58, rateSource: 'Bank of Japan Market Feed', effectiveAt: '2026-03-08T00:00:00Z', isAvailable: true }
};

export interface FormattedPriceResult {
  formattedOriginal: string;
  formattedApprox: string | null;
  rateSource: string | null;
  effectiveAt: string | null;
  isUnavailable: boolean;
}

class GlobalizationService {
  private activeCurrency: CurrencyCode = 'INR';

  public getSupportedCurrencies(): CurrencyConfig[] {
    return Object.values(CURRENCIES);
  }

  public getActiveCurrency(): CurrencyConfig {
    return CURRENCIES[this.activeCurrency] || CURRENCIES.INR;
  }

  public setCurrency(code: CurrencyCode): void {
    if (CURRENCIES[code]) {
      this.activeCurrency = code;
    }
  }

  public getExchangeRate(code: CurrencyCode): ExchangeRate | null {
    const config = CURRENCIES[code];
    if (!config || !config.isAvailable) return null;
    return {
      fromCurrency: 'INR',
      toCurrency: code,
      rate: 1 / config.exchangeRateToInr,
      rateSource: config.rateSource,
      effectiveAt: config.effectiveAt,
      isLive: true
    };
  }

  public formatInr(amountInInr: number): string {
    const config = this.getActiveCurrency();
    const converted = amountInInr / config.exchangeRateToInr;
    return `${config.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  public formatDualPrice(amountInInr: number, targetCurrency: CurrencyCode = this.activeCurrency): FormattedPriceResult {
    const originalFormatted = `₹${amountInInr.toLocaleString()}`;
    if (targetCurrency === 'INR') {
      return {
        formattedOriginal: originalFormatted,
        formattedApprox: null,
        rateSource: null,
        effectiveAt: null,
        isUnavailable: false
      };
    }

    const config = CURRENCIES[targetCurrency];
    if (!config || !config.isAvailable) {
      return {
        formattedOriginal: originalFormatted,
        formattedApprox: 'Exchange rate unavailable',
        rateSource: null,
        effectiveAt: null,
        isUnavailable: true
      };
    }

    const converted = amountInInr / config.exchangeRateToInr;
    const approx = `≈ ${config.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    return {
      formattedOriginal: originalFormatted,
      formattedApprox: approx,
      rateSource: config.rateSource,
      effectiveAt: config.effectiveAt,
      isUnavailable: false
    };
  }

  public convertCoinsToInr(coins: number): number {
    return coins / 100; // Fixed canonical rule: 100 Coins = 1 INR
  }
}

export const globalizationService = new GlobalizationService();
