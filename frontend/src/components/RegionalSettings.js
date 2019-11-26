import React from 'react'

const RegionalSettings = ({ handleChange }) => (
  <form className="flex-row flex-end without-margin">
    <select onChange={handleChange} name="currency">
      <option value="" disabled>Currency</option>
      <option value="EUR">EUR - €</option>
      <option value="GBP">GBP - £</option>
      <option value="USD">USD - $</option>
    </select>
  </form>
)

export default RegionalSettings
