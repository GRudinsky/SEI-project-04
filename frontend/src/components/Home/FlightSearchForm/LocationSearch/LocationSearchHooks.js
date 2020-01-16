import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faPlaneDeparture, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

export default function LocationSearch (props) {

  const [locationSuggestions, setlocationSuggestions] =  useState(null)
  const [searchFieldValue, setSearchFieldValue] = useState('')
  const [dropdownActive, setDropDownActive] = useState(false)

  function openDropdown() {
    setDropDownActive(true)
  }
  function setLocation(e) {
    props.handleChange(e)
    setDropDownActive(false)
    setSearchFieldValue(e.target.id)
  }
  function clearSearchField(e) {
    e.target.value = ''
    setlocationSuggestions(null)
    setSearchFieldValue(undefined)
  }
  function suggestLocations(e) {
    const obj = { 'searchString': e.target.value }
    axios.post('/api/proxy/locationSuggestions/', obj)
      .then(res => setlocationSuggestions(res.data))
      .catch(err => console.log(err))
  }
  function setIcon(arg) {
    return arg === 'country' ? <FontAwesomeIcon icon={faGlobeAmericas} /> : (arg === 'airport' ? <FontAwesomeIcon icon={faPlaneDeparture} /> : <FontAwesomeIcon icon={faCity} /> )
  }
  return (
      <>
      <input className="full-parent-wide"
        type="text" 
        name={props.divTitle}
        placeholder={props.divTitle.charAt(0).toUpperCase() + props.divTitle.slice(1) }   
        value={searchFieldValue}
        onChange={suggestLocations}
        onClick={clearSearchField}
        onFocus={openDropdown}
        onBlur={props.closeOnBlur}
        autoComplete="off"
      />
          {dropdownActive &&
      <div className="flex-column absolute half-parent-wide cursor-pointer with-shadow">
        {locationSuggestions && locationSuggestions.locations.map((location, idx) => (
          <div className="location-suggestion padding-5px"
            key={idx}
            title={props.divTitle}
            id={location.code}
            onClick={setLocation}
          >
            {setIcon(location.type)}   {location.code}  {location.name}  
          </div>
        ))
        }
      </div>
          }
    </>
  )
}
