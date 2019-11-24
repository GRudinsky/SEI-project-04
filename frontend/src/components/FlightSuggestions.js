import React from 'react'
import axios from 'axios'
import SuggestionsCard from './SuggestionsCard'

const suggestionsByDuration = []

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
  getSuggestions() { // getting cheapest direct flight suggestions from origin to all destinations in number of months that equals to this.monthsAhead value.
    axios.get(`https://api.skypicker.com/flights?fly_from=${this.props.defaultOrigin}&fly_to=&dateFrom=${this.getFlightDate()}&one_for_city=1&location_types=airport&location_types=country&location_types=city&direct_flights=1&curr=${this.props.searchData.currency}&partner=picky`)
      .then(res => this.setState({ suggestionResults: res.data },this.findLocalCity()))
      .catch(err => console.log('errors', err))
  }
  findLocalCity() {
    axios.get(`https://api.skypicker.com/locations?term=${this.props.defaultOrigin}&locale=en-US&&location_types=city&limit=10&active_only=true&sort=name`)
      .then(res => this.setState({ localCity: res.data.locations[0].name }))
      .catch(err => console.log(err))
  }
  render() {
    const { monthsAhead, flightDurations } = this
    const { suggestionResults } = this.state
    // console.log(suggestionsByDuration)
    if (!suggestionResults) return null
    return (
      <div className="container">
        <h2>Fly from {this.state.localCity} in {monthsAhead} months time:</h2>
        <div className="flex-row space-between with-scroll">
          {flightDurations.filter(duration => (suggestionResults.data.map(flight => this.getHoursOnly(flight.duration.total)).includes(duration)))
            .forEach(duration => suggestionsByDuration.push(this.getCheapestByDuration(suggestionResults.data, duration)))}
          {
            suggestionsByDuration.filter(flight => flight !== undefined)
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