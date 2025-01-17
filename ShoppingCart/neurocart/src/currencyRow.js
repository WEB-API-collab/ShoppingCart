import React from 'react';
import './currency.css';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div>
      <input type="number" className="currency-input" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
