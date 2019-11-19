import React from 'react'
import axios from 'axios'

class FlightSuggestions extends React.Component {
  constructor({ defaultOrigin, searchData }) {
    super(defaultOrigin, searchData)
    this.state = {}
    this.origin = defaultOrigin
    this.monthsAhead = 1
    this.currency = searchData.currency
  }
  getFlightDate() {
    const time = new Date()
    return `${time.getDate()}/${time.getMonth() + 1 + this.monthsAhead}/${time.getFullYear()}`
  }
  // getTime(value) {
  //   const time = new Date(value * 1000)
  //   return `${time.getHours()}:${time.getMinutes()}`
  // }
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
    return [result[0]]
  }
  getSuggestions() { // getting cheapest direct flight suggestions from origin to all destinations in number of months that equals to this.monthsAhead value.
    axios.get(`https://api.skypicker.com/flights?fly_from=${this.origin}&fly_to=&dateFrom=${this.getFlightDate()}&one_for_city=1&location_types=airport&location_types=country&location_types=city&direct_flights=1&curr=${this.currency}&partner=picky`)
      .then(res => this.setState({ suggestionResults: res.data }))
      .catch(err => console.log('errors', err))
  }
  componentDidMount() {
    this.getSuggestions()
  }
  render() {
    console.log(this.state)
    const { monthsAhead, getHoursOnly, getTime } = this
    const { suggestionResults } = this.state
    return (
      <>
      Fly to these destinations in {monthsAhead} months time:
        Up to 1 hr away:
        Up to 2 hr Away:
        Up to 3 hr away:
        Up to 4 hr away:
      
       {/* {suggestionResults && suggestionResults.data.map(flight => (
         <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
       ))
       } */}
         Up to 1 hr away:
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 1).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
         Up to 2 hr Away:
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 2).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
         Up to 3 hr away:
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 3).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 4).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 5).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 6).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 7).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 8).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 9).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 10).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 11).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 12).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
        {suggestionResults && this.getCheapestByDuration(suggestionResults.data, 13).map(flight => (
          <div key={suggestionResults.data.indexOf(flight)}>{flight.cityTo} - {flight.countryTo.name} - {flight.price} - {getTime(flight.duration.total)} {getHoursOnly(flight.duration.total)}</div>
        ))
        }
      </>
    )
  }
}


export default FlightSuggestions