// ACE Globalization, Multi-Currency & Internationalization Service
// Core rule: 100 ACE Coins = ₹1 (INR reference)

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  exchangeRateToInr: number; // 1 Unit = X INR
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', exchangeRateToInr: 1.0 },
  USD: { code: 'USD', symbol: '$', exchangeRateToInr: 86.5 },
  EUR: { code: 'EUR', symbol: '€', exchangeRateToInr: 92.0 },
  GBP: { code: 'GBP', symbol: '£', exchangeRateToInr: 110.0 },
  AED: { code: 'AED', symbol: 'AED ', exchangeRateToInr: 23.5 },
  SGD: { code: 'SGD', symbol: 'S$', exchangeRateToInr: 65.0 }
};

class GlobalizationService {
  private activeCurrency: CurrencyCode = 'INR';

  public getSupportedCurrencies(): CurrencyConfig[] {
    return Object.values(CURRENCIES);
  }

  public getActiveCurrency(): CurrencyConfig {
    return CURRENCIES[this.activeCurrency];
  }

  public setCurrency(code: CurrencyCode): void {
    if (CURRENCIES[code]) {
      this.activeCurrency = code;
    }
  }

  public formatInr(amountInInr: number): string {
    const config = this.getActiveCurrency();
    const converted = amountInInr / config.exchangeRateToInr;
    return `${config.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  public convertCoinsToInr(coins: number): number {
    return coins / 100; // Fixed canonical rule: 100 Coins = 1 INR
  }
}

export const globalizationService = new GlobalizationService();
