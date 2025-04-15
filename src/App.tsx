import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setFromCurrency, setToCurrency } from "./store/currencySlice";
import { useExchangeRate } from "./hooks/useExchangeRate";
import CURRENCIES from "./currencies";

const App = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency } = useSelector(
    (state: RootState) => state.currency
  );

  const [amount, setAmount] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const { data: rates, isLoading, error } = useExchangeRate(fromCurrency);

  const convertedAmount = rates
    ? (amount * (rates[toCurrency] || 1)).toFixed(2)
    : "0.00";

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-white text-black dark:bg-gray-900 dark:text-white relative transition-colors duration-300">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl p-6 sm:p-8 border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800">
          <h1 className="mb-5 text-2xl font-semibold text-center">Currency Converter</h1>

          <div className="mt-4 mb-4">
            <label
              htmlFor="amount"
              className="block text-xl font-medium dark:text-white"
            >
              Amount:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mt-1"
              min="0"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <select
              value={fromCurrency}
              onChange={(e) => dispatch(setFromCurrency(e.target.value))}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mt-1"
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white mt-1"
            >
              {CURRENCIES.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <p className="text-xl font-semibold text-center">Loading exchange rates...</p>
          ) : error ? (
            <p className="text-xl font-semibold text-center">Error fetching rates</p>
          ) : (
            <h2 className="text-xl font-semibold text-center">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
          )}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-800 dark:bg-gray-200 text-black dark:text-white rounded-md shadow hover:scale-105 transition-transform"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default App;
