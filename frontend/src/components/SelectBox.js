import React from 'react'
import Select from 'react-select'

const SelectBox = ({ locationSuggestions }) => (
  <Select options={locationSuggestions && locationSuggestions.locations.map(location  => (
    { value: location.code, label: location.slug } 
  ))}/>
)

export default SelectBox


