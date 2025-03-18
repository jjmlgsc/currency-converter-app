import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate } from "../api/currencyApi";

export const useExchangeRate = (fromCurrency: string) => {
  return useQuery({
    queryKey: ["exchangeRate", fromCurrency],
    queryFn: () => fetchExchangeRate(fromCurrency),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
