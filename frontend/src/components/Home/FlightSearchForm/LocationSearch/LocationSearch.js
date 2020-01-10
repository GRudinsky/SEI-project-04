import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCity, faPlaneDeparture, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

export default class LocationSearch extends React.Component {
  constructor () {
    super()
    this.state = {
      locationSuggestions: null,
      chosenLocation: undefined,
      searchFieldValue: '',
      dropdownActive: false
    }
    this.suggestLocations = this.suggestLocations.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.deleteLocation = this.deleteLocation.bind(this)
    this.clearSearchField = this.clearSearchField.bind(this)
  }
  openDropdown() {
    this.setState({ dropdownActive: true })
  }
  setLocation(e) {
    this.props.handleChange(e)
    this.setState({ chosenLocation: e.target.id , dropdownActive: false, searchFieldValue: e.target.id })
  }
  deleteLocation(e) {
    e.target.value = ''
    this.setState({ chosenLocation: undefined, locationSuggestions: null }, this.clearSearchField())
  }
  clearSearchField() {
    this.setState({ searchFieldValue: undefined })
  }
  suggestLocations(e) {
    const obj = { 'searchString': e.target.value }
    axios.post('/api/proxy/locationSuggestions/', obj)
      .then(res => this.setState({ locationSuggestions: res.data }))
      .catch(err => console.log(err))
  }
  setIcon(arg) {
    return (arg === 'country' ? <FontAwesomeIcon icon={faGlobeAmericas} /> : (arg === 'airport' ? <FontAwesomeIcon icon={faPlaneDeparture} /> : <FontAwesomeIcon icon={faCity} /> ))
  }
  render () {
    // console.log(this.state)
    const { dropdownActive, locationSuggestions, searchFieldValue } = this.state
    const { suggestLocations, openDropdown, setLocation, deleteLocation } = this
   
    return (
      <>
      <input className="full-parent-wide"
        type="text" 
        name={this.props.divTitle}
        placeholder={this.props.divTitle.charAt(0).toUpperCase() + this.props.divTitle.slice(1) }   
        value={searchFieldValue}
        onChange={suggestLocations}
        onClick={deleteLocation}
        onFocus={openDropdown}
        onBlur={this.props.closeOnBlur}
        autoComplete="off"
      />
          {dropdownActive &&
      <div className="flex-column absolute half-parent-wide cursor-pointer with-shadow">
        {locationSuggestions && locationSuggestions.locations.map(location => (
          <div className="location-suggestion padding-5px"
            key={locationSuggestions.locations.indexOf(location)}
            title={this.props.divTitle}
            id={location.code}
            onClick={setLocation}
          >
            {this.setIcon(location.type)}   {location.code}  {location.name}  
          </div>
        ))
        }
      </div>
          }
    </>
    )
  }
}