import React from 'react'

const CurrencySelector = (props ) => (
  <form className="flex-row without-margin">
    <select className="without-border" 
      name="currency"
      value = {props.currency}
      onChange={props._onChange} 
    >
      <option value="" disabled>Currency</option>
      <option value="EUR">EUR - €</option>
      <option value="GBP">GBP - £</option>
      <option value="USD">USD - $</option>
    </select>
  </form>
)
export default CurrencySelector



