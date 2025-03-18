import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setFromCurrency, setToCurrency } from "./store/currencySlice";
import { useExchangeRate } from "./hooks/useExchangeRate";

const CURRENCIES = ["USD", "EUR", "PHP", "JPY", "CAD"];

const App = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency } = useSelector(
    (state: RootState) => state.currency
  );

  const [amount, setAmount] = useState(1);
  const { data: rates, isLoading, error } = useExchangeRate(fromCurrency);

  const convertedAmount = rates ? (amount * (rates[toCurrency] || 1)).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
        <h1 className="mb-5 text-2xl font-semibold">
          Currency Converter
        </h1>

        <div className="mt-4">
          <label
            htmlFor="amount"
            className="block text-xl font-medium"
          >
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            min="0"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => dispatch(setFromCurrency(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          >
            {CURRENCIES.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>

          <span className="p-2 text-xl">➡️</span>

          <select
            value={toCurrency}
            onChange={(e) => dispatch(setToCurrency(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          >
            {CURRENCIES.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p>Loading exchange rates...</p>
        ) : error ? (
          <p>Error fetching rates</p>
        ) : (
          <h2 className="text-xl font-semibold text-center">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
};

export default App;
