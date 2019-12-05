import React from 'react'
import axios from 'axios'
import SuggestionsCard from './SuggestionsCard'
import Map from './Common/Map'
import WebMercatorViewport from 'viewport-mercator-project'

const suggestionsByDurations = [] // this array fills with flight data as soon as component mounts
let suggestionsByHour = []

export default class FlightSuggestions extends React.Component {
  constructor() {
    super()
    this.state = {
      suggestionResults: null 
    }
    this.flightDurations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    this.monthsAhead = 1
    this.getMoreSuggestions = this.getMoreSuggestions.bind(this)
    this.fitToBounds = this.fitToBounds.bind(this)
  }

  componentDidMount() {
    this.getStorage()
  }

  getTime(value) {
    const time = new Date(value * 1000)
    return `${time.getHours() - 1}h ${time.getMinutes()}mins`
  }

  getHoursOnly(value) {
    const time = new Date(value * 1000)
    return time.getHours() - 1
  }

  getCheapestByDuration(data, hours) {
    const result = data.filter(flight => (this.getHoursOnly(flight.duration.total) < hours && this.getHoursOnly(flight.duration.total) > (hours - 2) ))
    return result[0]
  }

  getDurationsAndFlights() {
    return this.flightDurations.filter(duration => (this.state.suggestionResults.data.map(flight => this.getHoursOnly(flight.duration.total)).includes(duration)))
      .forEach(duration => suggestionsByDurations.push(this.getCheapestByDuration(this.state.suggestionResults.data, duration)))
  }
  getAllFlightsForDuration(arg) {
    // console.log(this.state.suggestionResults.data.filter(flight => this.getHoursOnly(flight.duration.total) === (parseInt(this.state.filterHours) - 1)))
    suggestionsByHour = this.state.suggestionResults.data.filter(flight => this.getHoursOnly(flight.duration.total) === (parseInt(arg) - 1))
  }
  getSuggestions() {
    const currency = localStorage.getItem('currency') || this.props.suggestionsData.defaultCurrency
    const origin = localStorage.getItem('origin') || this.props.suggestionsData.defaultOrigin
    const date = localStorage.getItem('departureDate') || this.props.defaultDate
    const obj = { 
      'origin': origin,
      'date': date,
      'currency': currency
    } // getting cheapest direct flight suggestions from origin to all destinations in number of months that equals to this.monthsAhead value.
    axios.post('/api/proxy/flightSuggestions/', obj)
      .then(res => this.setState({ suggestionResults: res.data, currency, origin, date }, this.findOrigin()))
      .catch(err => console.log('errors', err))
  }
  getStorage() {
    // const searchData = { ...this.state.searchData }
    const currency = localStorage.getItem('currency' || '')
    const origin = localStorage.getItem('origin' || '')
    const departureDate = localStorage.getItem('departureDate' || '')
    return this.setState({ currency, origin, departureDate }, this.getSuggestions())
  }

  findOrigin() {
    const obj = { 'searchString': this.state.origin }
    // console.log(obj)
    axios.post('/api/proxy/locationSuggestions/', obj)
      // .then(res => res.data.locations[0].type === 'airport' ? this.setState({ origin: (res.data.locations[0].city.name) }, this.getDurationsAndFlights()) : this.setState({ origin: (res.data.locations[0].name) }, this.getDurationsAndFlights()))
      .then(res => this.setState({ origin: res.data.locations[0].type === 'airport' ? res.data.locations[0].city.name : res.data.locations[0].name }, this.getDurationsAndFlights()))
      // .then(res => console.log('suggestions', res))
      .catch(err => console.log('errors', err))
  }
  getMoreSuggestions(e) {
    // console.log(e.currentTarget.id)
    return this.setState({ hourlySuggestionsBarActive: true, hoursOnFilter: e.currentTarget.id }, this.getAllFlightsForDuration(e.currentTarget.id))
  }
  getMapBounds() {
    const coordinatesArray = suggestionsByHour.map(point => [point.route[0].lngTo, point.route[0].latTo])
    const longitudes = (coordinatesArray.map(coords => coords[0]))
    const latitudes = (coordinatesArray.map(coords => coords[1]))
    const sw = [Math.min(...longitudes), Math.min(...latitudes)]
    const ne = [Math.max(...longitudes), Math.max(...latitudes)]
    const bounds = [sw, ne]
    return bounds
  }
  fitToBounds() {
    const { longitude, latitude, zoom } = new WebMercatorViewport({ 
      width: 680,
      height: 400,
      latitude: 50,
      longitude: 10,
      zoom: 1.89,
      bearing: 0,
      pitch: 0
    }).fitBounds(this.getMapBounds())
    // .fitBounds(this.props.bounds, { padding: { top: 82, bottom: 30, left: leftPadding, right: 30 } })
    // console.log(longitude, latitude, zoom)
    return [longitude, latitude, zoom]
  }
  getSuggestionsText() {
    if (localStorage.getItem('departureDate')) {
      return `Still interested in flights from ${this.state.origin} on ${this.state.date }?` 
    }
    return `Cheapest destinations from ${this.state.origin} in ${this.props.suggestionsData.defaultWeeksAhead} weeks time`
  }
  render() {
    if (!this.state.suggestionResults) return null
    suggestionsByHour[0] && console.log('suggestions', suggestionsByHour, this.fitToBounds())
    return (
      <div className="container">
        <h4 className="bold-font">{this.getSuggestionsText()}</h4>
        <div className="flex-row space-between with-scroll">
          {suggestionsByDurations.filter(flight => flight !== undefined)
            .map(flight => (
              <SuggestionsCard 
                key={flight.id}
                price={flight.price}
                duration={flight.duration.total}
                conversion={flight.conversion}
                cityTo={flight.cityTo}
                flight={flight}
                getMoreSuggestions={this.getMoreSuggestions}
              />
            ))
          }
        </div>
        {this.state.hourlySuggestionsBarActive &&
          <div>
            <h4 className = "bold-font">All destinations {this.state.hoursOnFilter} hours away:</h4>
            <Map
              handleChange={this.props.handleChange}
              searchFromMap={this.props.searchFromMap}
              data = {suggestionsByHour}
              bounds={this.getMapBounds()}
              lng={this.fitToBounds()[0]}
              lat={this.fitToBounds()[1]}
              zoom={this.fitToBounds()[2] < 6 ? this.fitToBounds()[2] - 0.1 : 6} // if one result, setting max-zoom to 6 to avoid over-magnifying, if more results, adding padding by reducing zoom by 0.1
            />
          </div>
        }
      </div>
    )
  }
}