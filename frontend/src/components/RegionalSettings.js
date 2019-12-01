import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'EUR', label: 'EUR - €' },
  { value: 'GBP', label: 'GBP - £' },
  { value: 'USD', label: 'USD - $' }
]
// const RegionalSettings = ({ handleChange }) => (
//   <Select
//     options={options}
//     onChange={handleChange}
//   />
// )

const RegionalSettings = ({ handleChange, currency }) => (
  <form className="flex-row flex-end without-margin">
    <select onChange={handleChange} value = {currency} name="currency">
      <option value="" disabled>Currency</option>
      <option value="EUR">EUR - €</option>
      <option value="GBP">GBP - £</option>
      <option value="USD">USD - $</option>
    </select>
  </form>
)

export default RegionalSettings

