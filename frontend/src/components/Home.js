import React from 'react'
import axios from 'axios'

import Calendar from './Calendar'
import ResultsCard from './ResultsCard'
import '@lls/react-light-calendar/dist/index.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      flightResults: null,
      fakeFlighData: {
        flyFrom: 'VNO',
        flyTo: 'NGO',
        cityFrom: 'Vilnius',
        cityTo: 'Nagoya',
        price: 344,
        fly_duration: '21h 0m',
        dTime: 1574157600,
        dTimeUTC: 1574150400,
        aTime: 1574258400,
        aTimeUTC: 1574226000,
        pnr_count: 2,
        route: [
          { flyFrom: 'VNO',
            flyTo: 'HEL',
            cityTo: 'Helsinki',
            cityFrom: 'Vilnius' },
          { 
            flyFrom: 'HEL',
            flyTo: 'PVG', 
            cityTo: 'Shanghai',
            cityFrom: 'Helsinki'  },
          {
            flyFrom: 'PVG',
            flyTo: 'NGO',
            cityTo: 'Nagoya',
            cityFrom: 'Shanghai'
          }
        ]
      },
      searchData: {
      },
      departureCalendarActive: false,
      returnCalendarActive: false,
      startDate: null,
      endDate: null,
      returnDateLimit: null,
      dateFrom: null,
      dateTo: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleCalendar = this.toggleCalendar.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }
  //form functions
  handleChange(e) {
    const searchData = { ...this.state.searchData, [e.target.name]: e.target.value }
    console.log(this.state.searchData)
    this.setState({ searchData })
  }
  getSearchString() {

    // https://api.skypicker.com/flights?fly_from=VNO&fly_to=JP&dateFrom=18/11/2019&dateTo=19/11/2019&partner=picky
    return `flights?fly_from=${this.state.searchData.origin}&fly_to=${this.state.searchData.destination}&dateFrom=${this.state.searchData.departureDate}&dateTo=${this.state.searchData.returnDate}&partner=picky`
  }

  handleSubmit(e) {
    // e.prevetDefault()
    // console.log('submitting search')
    axios.post('/api/proxyflights/', this.state.searchData)
      .then(res => this.setState({ flightResults: res.data }))
      .catch(err => console.log('errors', err))
  }
  getDate(value) {
    const time = new Date(value)
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
  }
  getTime(value) {
    const time = new Date(value)
    return `${time.getHours()}:${time.getMinutes()}`
  }
  handleDateChange(startDate, endDate) {
    const dateFrom = this.getDate(startDate)
    const dateTo = this.getDate(endDate)
    this.setState({ startDate, endDate, dateFrom, dateTo }, () => {
      // this.state.departureCalendarActive ? this.setState({ ... }) : this.setState({ searchData.returnDate: dateFrom })
      if (this.state.departureCalendarActive) {
        this.setState({ returnDateLimit: startDate, searchData: { ...this.state.searchData, departureDate: dateFrom } })
      } else {
        this.setState({ searchData: { ...this.state.searchData, returnDate: dateFrom } })
      }
    })
    
  }
  toggleCalendar(e) {
    e.target.name === 'departureDate' ? this.setState({ departureCalendarActive: true, returnCalendarActive: false }) : (e.target.name === 'returnDate' ? this.setState({ departureCalendarActive: false, returnCalendarActive: true }) : this.setState({ departureCalendarActive: false, returnCalendarActive: false }) )
  }

  render() {
    const { searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, fakeFlighData } = this.state
    const { handleChange, toggleCalendar, handleDateChange } = this

    console.log('state', this.state)
    return (
      <section className="container">
        <form
          value="form"
          onSubmit={this.handleSubmit}
          onFocus={toggleCalendar}
        >
          <div className="search-bar">
            <div className="row">
              <div className="three columns">
                {/* <label className="label">From</label> */}
                <div className="control">
                  <input 
                    className="input" 
                    type="text"
                    name="origin"
                    placeholder="From"
                    value={searchData.origin}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="three columns">
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="destination"
                    placeholder="To" 
                    value={searchData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="three columns">
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="departureDate"
                    placeholder="Departure"
                    value={searchData.departureDate}
                    // value={this.state.departureCalendarActive && this.state.dateFrom}
                    onChange={handleChange}
                    onFocus={toggleCalendar}
                  />
                </div>
                {this.state.departureCalendarActive &&
                  <Calendar
                    handleChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    departureCalendarActive={departureCalendarActive} 
                    returnCalendarActive={returnCalendarActive}
                  />}
              </div>
              <div className="two columns">
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="returnDate"
                    placeholder="Return" 
                    value={searchData.returnDate}
                    // value={this.state.returnCalendarActive && this.state.dateFrom}
                    onChange={handleChange}
                    onFocus={toggleCalendar}
                    // disabled
                  />
                  {this.state.returnCalendarActive &&
                    <Calendar
                      handleChange={this.handleDateChange}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate} 
                      departureCalendarActive={departureCalendarActive}
                      returnCalendarActive={returnCalendarActive}
                      disableDates={date => date < this.state.returnDateLimit}
                    />}
                </div>
              </div>
              <div 
                className="button is-info"
                onClick={this.handleSubmit}>
                Submit
              </div>
            </div>
          </div>
        </form>
        <div className="flex-column">
          <ResultsCard
            flyFrom = {fakeFlighData.flyFrom}
            flyTo={fakeFlighData.flyTo}
            price={fakeFlighData.price}
            fly_duration={fakeFlighData.fly_duration}
            cityFrom={fakeFlighData.cityFrom}
            cityTo={fakeFlighData.cityTo}
            route={fakeFlighData.route}
            dTime={fakeFlighData.dTime}
            aTime={fakeFlighData.aTime}
            pnr_count={fakeFlighData.pnr_count}
          />
          {this.state.flightResults && this.state.flightResults.data.map(flight => (
            <ResultsCard key={flight.id}
              {...flight}
              currency = {this.state.flightResults.currency}/>
          ))}
        </div>
      </section>
    )
  }

}
export default Home

