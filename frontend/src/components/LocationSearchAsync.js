import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'

// const suggestLocations = () => (
//   axios.get(`https://api.skypicker.com/locations?term=${e.target.value}&locale=en-US&location_types=airport&location_types=country&location_types=city&limit=10&active_only=true&sort=name`)
//     .then(res => res.data.locations.map(location => ({ value: location.code, label: location.slug })))
//     .catch(err => console.log(err))
// )

class AsyncSearch extends React.Component {
  constructor () {
    super()
    this.state = {
      locationSuggestions: null,
      chosenLocation: null,
      searchFieldValue: null,
      dropdownActive: false
    }
    this.suggestLocations = this.suggestLocations.bind(this)
    // this.openDropdown = this.openDropdown.bind(this)
    this.setLocation = this.setLocation.bind(this)
    // this.deleteLocation = this.deleteLocation.bind(this)
    // this.clearSearchField = this.clearSearchField.bind(this)
  }
  // openDropdown() {
  //   this.setState({ dropdownActive: true })
  // }

  setLocation(e) {
    this.props.handleChange(e)
    this.setState({ chosenLocation: e.target.id })
  }
  // deleteLocation(e) {
  //   e.target.value = ''
  //   this.setState({ chosenLocation: '', locationSuggestions: null }, this.clearSearchField(e))
  // }
  // clearSearchField() {
  //   this.setState({ searchFieldValue: null })
  // }

  suggestLocations(e) {
    axios.get(`https://api.skypicker.com/locations?term=${e.target.value}&locale=en-US&location_types=airport&location_types=country&location_types=city&limit=10&active_only=true&sort=name`)
      .then(res => res.data.locations.map(location => ({ value: location.code, label: location.slug })))
      .catch(err => console.log(err))
  }
  render () {
    const { chosenLocation } = this.state
    const { suggestLocations } = this
   
    return (
      <>
        <AsyncSelect placeholder='From' value={chosenLocation} cacheOptions defaultOptions loadOptions={suggestLocations} onChange={location => this.setState({ chosenLocation: location, fromAirports: location.value })} />
      </>
    )
  }
}

export default AsyncSearch