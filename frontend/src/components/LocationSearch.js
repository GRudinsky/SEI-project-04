import React from 'react'
import axios from 'axios'

class LocationSearch extends React.Component {
  constructor () {
    super()
    this.state = {
      locationSuggestions: null,
      chosenLocation: null,
      searchFieldValue: null,
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
    this.setState({ chosenLocation: '', locationSuggestions: null }, this.clearSearchField(e))
  }
  clearSearchField() {
    this.setState({ searchFieldValue: null })
  }

  suggestLocations(e) {
    axios.get(`https://api.skypicker.com/locations?term=${e.target.value}&locale=en-US&location_types=airport&location_types=country&location_types=city&limit=10&active_only=true&sort=name`)
      .then(res => this.setState({ locationSuggestions: res.data }))
      .catch(err => console.log(err))
  }
  render () {
    const { dropdownActive, locationSuggestions, searchFieldValue } = this.state
    const { suggestLocations, openDropdown, setLocation, deleteLocation } = this
   
    return (
      <>
      <input className="full-parent-wide"
        type="text" 
        name={this.props.divTitle}
        placeholder={this.props.divTitle}   
        value={searchFieldValue}
        onChange={suggestLocations}
        onClick={deleteLocation}
        onFocus={openDropdown}
        autoComplete="off"
      />
          {dropdownActive &&
      <div className="flex-column absolute half-parent-wide cursor-pointer">
        {locationSuggestions && locationSuggestions.locations.map(location => (
          <div
            key={locationSuggestions.locations.indexOf(location)}
            title={this.props.divTitle}
            id={location.code}
            onClick={setLocation}
          >
            {location.name} {location.type.charAt(0).toUpperCase() + location.type.slice(1)} - {location.code}
          </div>
        ))
        }
      </div>
          }
    </>
    )
  }
}

export default LocationSearch