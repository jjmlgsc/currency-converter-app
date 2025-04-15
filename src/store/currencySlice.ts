import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  fromCurrency: string;
  toCurrency: string;
}

const initialState: CurrencyState = {
  fromCurrency: "USD",
  toCurrency: "PHP",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
  },
});

export const { setFromCurrency, setToCurrency } = currencySlice.actions;
export default currencySlice.reducer;
