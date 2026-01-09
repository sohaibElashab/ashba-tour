import { Currency } from "@/contexts/locale-context";

// Exchange rates (base: USD)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  MAD: 10.12,
};

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  // Convert from source currency to USD first
  const amountInUSD = amount / exchangeRates[fromCurrency];

  // Then convert from USD to target currency
  const convertedAmount = amountInUSD * exchangeRates[toCurrency];

  return Math.round(convertedAmount * 100) / 100;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbols: Record<Currency, string> = {
    USD: "$",
    EUR: "€",
    MAD: "MAD",
  };

  const symbol = symbols[currency];

  if (currency === "MAD") {
    return `${amount.toFixed(2)} ${symbol}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
}

export function convertAndFormat(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): string {
  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  return formatCurrency(converted, toCurrency);
}
