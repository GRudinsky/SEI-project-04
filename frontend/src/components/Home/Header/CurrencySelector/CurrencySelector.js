import React from 'react'

const CurrencySelector = ({ handleChange, currency }) => (
  <form className="flex-row without-margin">
    <select className="without-border" 
      name="currency"
      value = {currency}
      onChange={handleChange} 
    >
      <option value="" disabled>Currency</option>
      <option value="EUR">EUR - €</option>
      <option value="GBP">GBP - £</option>
      <option value="USD">USD - $</option>
    </select>
  </form>
)
export default CurrencySelector



