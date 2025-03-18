import axios from "axios";

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

export const fetchExchangeRate = async (fromCurrency: string) => {
  const response = await axios.get(`${API_URL}${fromCurrency}`);
  return response.data.rates;
};
