import React from 'react'
import axios from 'axios'
import SuggestionsCard from './SuggestionsCard'

const suggestionsByDuration = [] // this array fills with flight data as soon ascomponent mounts

class FlightSuggestions extends React.Component {
  constructor() {
    super()
    this.state = {
      suggestionResults: null
    }
    this.flightDurations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    this.monthsAhead = 1
  }

  componentDidMount() {
    this.getSuggestions()
  }

  getFlightDate() {
    const time = new Date()
    return `${time.getDate()}/${time.getMonth() + 1 + this.monthsAhead}/${time.getFullYear()}`
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
      .forEach(duration => suggestionsByDuration.push(this.getCheapestByDuration(this.state.suggestionResults.data, duration)))
  }

  getSuggestions() {
    const obj = { 
      'origin': this.props.defaultOrigin,
      'date': this.getFlightDate(),
      'currency': this.props.searchData.currency 
    } // getting cheapest direct flight suggestions from origin to all destinations in number of months that equals to this.monthsAhead value.
    axios.post('/api/proxy/flightSuggestions/', obj)
      .then(res => this.setState({ suggestionResults: res.data }, this.findLocalCity()))
      .catch(err => console.log('errors', err))
  }

  findLocalCity() {
    const obj = { 'searchString': this.props.defaultOrigin }
    console.log(obj)
    axios.post('/api/proxy/citySearch/', obj)
      .then(res => this.setState({ localCity: res.data }, this.getDurationsAndFlights() ))
      .catch(err => console.log('errors', err))
  }

  render() {
    if (!this.state.suggestionResults) return null
    return (
      <div className="container">
        <h2>Fly from {this.state.localCity} in {this.monthsAhead} months time:</h2>
        <div className="flex-row space-between with-scroll">
          {suggestionsByDuration.filter(flight => flight !== undefined)
            .map(flight => (
              <SuggestionsCard 
                key={flight.id}
                price={flight.price}
                duration={flight.duration.total}
                conversion={flight.conversion}
                cityTo={flight.cityTo}
                flight={flight}
              />
            ))
          }
        </div>
      </div>
    )
  }
}


export default FlightSuggestions