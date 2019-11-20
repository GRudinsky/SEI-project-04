import React from 'react'
import axios from 'axios'
import SuggestionsCard from './SuggestionsCard'

class FlightSuggestions extends React.Component {
  constructor({ defaultOrigin, searchData }) {
    super(defaultOrigin, searchData)
    this.state = {
      suggestionResults: null
    }
    this.flightDurations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    this.origin = defaultOrigin
    this.monthsAhead = 1
    this.currency = searchData.currency
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
    return [result[0]]
  }
  getSuggestions() { // getting cheapest direct flight suggestions from origin to all destinations in number of months that equals to this.monthsAhead value.
    axios.get(`https://api.skypicker.com/flights?fly_from=${this.origin}&fly_to=&dateFrom=${this.getFlightDate()}&one_for_city=1&location_types=airport&location_types=country&location_types=city&direct_flights=1&curr=${this.currency}&partner=picky`)
      .then(res => this.setState({ suggestionResults: res.data }))
      .catch(err => console.log('errors', err))
  }
  
 
  render() {
    console.log(this.state)
    const { monthsAhead, flightDurations } = this
    const { suggestionResults } = this.state
    if (!suggestionResults) return null
    return (
      <div className="container">
        <h2>Fly to these destinations in {monthsAhead} months time:</h2>
        <div className="flex-row space-around wrap">

          {flightDurations.forEach(duration => {
            this.getCheapestByDuration(suggestionResults.data, duration)[0] &&
          this.getCheapestByDuration(suggestionResults.data, duration).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
        
          ))
          })}
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[0])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[0]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[1])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[1]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[2])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[2]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[3])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[3]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[4])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[4]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[5])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[5]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[6])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[6]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[7])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[7]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[8])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[8]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[9])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[9]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[10])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[10]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[11])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[11]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[12])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[12]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[13])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[13]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[14])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[14]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[15])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[15]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[16])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[16]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[17])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[17]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[18])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[18]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[19])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[19]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[20])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[20]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[21])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[21]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
              price={flight.price}
              duration={flight.duration.total}
              conversion={flight.conversion}
              cityTo={flight.cityTo}
              flight={flight}
            />
          ))
          }
          {this.getCheapestByDuration(suggestionResults.data, flightDurations[22])[0] && this.getCheapestByDuration(suggestionResults.data, flightDurations[22]).map(flight => (
            <SuggestionsCard key={suggestionResults.data.indexOf(flight)}
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