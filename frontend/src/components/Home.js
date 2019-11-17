import React from 'react'
import axios from 'axios'
import RegionalSettings from './RegionalSettings'
import FlightSearchBar from './FlightSearchBar'
import ResultsCard from './ResultsCard'
import Map from './Map'
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
          {
            id: '0c880ddc472b0000c919984d_0',
            flyFrom: 'VNO',
            flyTo: 'HEL',
            airline: 'AY',
            cityTo: 'Helsinki',
            cityFrom: 'Vilnius',
            latFrom: 54.634167,
            lngFrom: 25.285833,
            latTo: 52.165833,
            lngTo: 20.967222 },
          { 
            id: '0c880ddc472b0000c919984d_1',
            flyFrom: 'HEL',
            flyTo: 'PVG', 
            airline: 'HO',
            cityTo: 'Shanghai',
            cityFrom: 'Helsinki',
            latFrom: 52.165833,
            lngFrom: 20.967222,
            latTo: 40.08,
            lngTo: 116.584444  },
          {
            id: '0ddc14a2472c0000ec715d27_0',
            flyFrom: 'PVG',
            flyTo: 'NGO',
            cityTo: 'Nagoya',
            airline: 'HO',
            cityFrom: 'Shanghai',
            latFrom: 40.08,
            lngFrom: 116.584444,
            latTo: 38.965556,
            lngTo: 121.538611
          }
        ]
      },
      searchData: {
        user: 'undefined',
        currency: 'EUR'
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
    this.toggleMapDropDown = this.toggleMapDropDown.bind(this)
  }
  //form functions
  handleChange(e) {
    const searchData = { ...this.state.searchData, [e.target.name]: e.target.value }
    console.log(e.target.name)
    console.log(this.state.searchData)
    this.setState({ searchData })
  }

  handleSubmit(e) {
    // e.prevetDefault()
    axios.post('/api/proxyflights/', this.state.searchData)
      .then(res => this.setState({ flightResults: res.data }), this.pushSearchtoDB())
      .catch(err => console.log('errors', err))
  }
  pushSearchtoDB(){
    axios.post('/api/searches', this.state.searchData)
      .then(res => console.log(res))
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
  // Map functions
  toggleMapDropDown(e) {
    console.log(e.target.id)
    this.state.flightOnMap !== e.target.id ? this.setState({ flightOnMap: e.target.id }) : this.setState({ flightOnMap: '' })
  }

  componentDidMount() {
    axios.get('api/searches')
      .then(res => this.setState({ searches: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, fakeFlighData, flightOnMap } = this.state
    const { handleChange, handleDateChange, handleSubmit, toggleCalendar, toggleMapDropDown } = this

    console.log('state', this.state)
    return (
      <section>
        <RegionalSettings 
          handleChange = {handleChange}
        />
        <div className="search-bar half-high flex-column centered">
          <FlightSearchBar 
            { ...{ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleCalendar }}
          />
        </div>
        <div className="flex-column centered">
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
          />
          {this.state.flightResults && this.state.flightResults.data.map(flight => (
            <ResultsCard key={flight.id}
              {...flight}
              currency = {this.state.flightResults.currency}/>
          ))}
        </div>
        <div className="flex-row centered">
          {this.state.searches && (
            <p>{this.state.searches.length} searches and counting</p>
          )}
        </div>
        <Map 
          data = {fakeFlighData}
          mapDropDown = {toggleMapDropDown}
          flightOnMap = {flightOnMap}
        />
      </section>
    )
  }
}
export default Home

