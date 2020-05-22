import React, { createContext, useState } from 'react';
import currencies from './data/currencies';

const initialState = {
  calculateChange: () => {},
  results: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children, ...rest }) => {
  const [results, setResults] = useState(initialState.results);

  const calculateChange = ({ currency, price, tendered, json }) => {
    const prefix = {
      gbp: '£',
      usd: '$',
      eur: '€',
    };

    const setPrefix = (value) => `${prefix[currency]}${value}`;

    const totalChange = parseFloat(tendered - price).toFixed(2);
    let balance = Math.round(totalChange * 100);
    const change = currencies
      .filter((c) => c.currency === currency)
      .sort((a, b) => b.denomination - a.denomination)
      .reduce((res, tender) => {
        const { title, denomination } = tender;
        const total = Math.floor(balance / denomination);
        if (total > 0) {
          balance -= total * denomination;
          res = [...res, { title, total }];
        }
        return res;
      }, []);
      const jsonChange = json ? JSON.stringify(change) : null;
    setResults({
      change,
      jsonChange,
      totalChange: setPrefix(totalChange),
      price: setPrefix(price),
      tendered: setPrefix(tendered),
    });
  };

  const values = {
    ...initialState,
    calculateChange,
    results,
    ...rest,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
