import React from 'react'
import axios from 'axios'

import Calendar from './Calendar'
import '@lls/react-light-calendar/dist/index.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      flightResults: null,
      searchData: {
      },
      departureCalendarActive: false,
      returnCalendarActive: false,
      startDate: null,
      endDate: null,
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
 
  handleSubmit(e) {
    e.prevetDefault()
    console.log(e.target.value)
    axios.get('/api/proxyflights')
      .then(res => this.setState({ flightResults: res.json() }))
      .catch(err => console.log('errors', err))
  }
  getDate(value) {
    const time = new Date(value)
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
  }
  handleDateChange(startDate, endDate) {
    const dateFrom = this.getDate(startDate)
    const dateTo = this.getDate(endDate)
    this.setState({ startDate, endDate, dateFrom, dateTo })
  }
  toggleCalendar(e) {
    e.target.name === 'departureDate' ? this.setState({ departureCalendarActive: true, returnCalendarActive: false }) : this.setState({ departureCalendarActive: false, returnCalendarActive: true })
  }

  render() {

    // fetch('/api/proxyflights')
    //   .then(res => res.json())
    //   .then(res => console.log('response', res))
    //   .catch(err => console.log(err))

  
    const { searchData } = this.state
    const { handleChange, toggleCalendar } = this

    console.log('state', this.state)
    return (
      <section className="container">
        <form
          value='form'
          onSubmit={this.handleSubmit}
        >
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
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
              <div className="field">
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
              <div className="field">
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="departureDate"
                    placeholder="Departure"
                    // value={searchData.departureDate}
                    value={this.state.dateFrom}
                    onClick={toggleCalendar}
                    onChange={handleChange} />
                </div>
                {this.state.departureCalendarActive &&
                  <Calendar
                    handleChange={this.handleDateChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate} />}
              </div>
              <div className="field">
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    name="returnDate"
                    placeholder="Return" 
                    value={searchData.returnDate}
                    onChange={handleChange}
                    onClick={toggleCalendar}
                    // disabled
                  />
                  {this.state.returnCalendarActive &&
                    <Calendar
                      handleChange={this.handleDateChange}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate} />}
                </div>
              </div>
              <div className="control">
                <div className="button is-info">Submit</div>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }

}
export default Home

