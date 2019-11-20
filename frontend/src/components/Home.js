import React from 'react'
import axios from 'axios'
import RegionalSettings from './RegionalSettings'
import LoadingScreen from './Common/LoadingScreen'
import FlightSearchBar from './FlightSearchBar'
import ResultsCard from './ResultsCard'
import FlightSuggestions from './FlightSuggestions'
import Map from './Map'
import '@lls/react-light-calendar/dist/index.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      flightResults: null,
      loading: false,
      defaultOrigin: 'LON', // for flight suggestions
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
        currency: 'EUR',
        origin: null
      },
      departureCalendarActive: false,
      returnCalendarActive: false,
      startDate: null,
      endDate: null,
      returnDateLimit: null,
      dateFrom: null,
      dateTo: null
    }
    this.loadingMessage = 'We are getting your flight..'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleLocationDropDown = this.toggleLocationDropDown.bind(this)
    this.closeLocationDropDown = this.closeLocationDropDown.bind(this)
    this.toggleCalendar = this.toggleCalendar.bind(this)
    this.closeCalendar = this.closeCalendar.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.toggleMapDropDown = this.toggleMapDropDown.bind(this)
    this.suggestLocations = this.suggestLocations.bind(this)
    this.clearLocationState = this.clearLocationState.bind(this)
  }
  //form functions
  handleChange(e) {
    const searchData = e.target.name ? { ...this.state.searchData, [e.target.name]: e.target.value } : { ...this.state.searchData, [e.target.title]: e.target.id }
    console.log('name', e.target.name)
    console.log('title', e.target.id)
    console.log(this.state.searchData)
    this.setState({ searchData })
  }
  toggleLoadingScreen() {
    return this.setState({ loading: true })
  }
  locationOptions() {
    return this.state.locationSuggestions && this.state.locationSuggestions.locations.map(location => (
      { value: location.code, label: location.slug }
    ))
  }

  handleSubmit(e) {
    // e.prevetDefault()
    this.toggleLoadingScreen()
    axios.post('/api/proxyflights/', this.state.searchData)
      .then(res => this.setState({ flightResults: res.data, loading: false }), this.pushSearchtoDB())
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
  closeCalendar(e) {
    setTimeout(() => (this.state.departureDate && this.setState({ departureCalendarActive: false }) || this.state.returnDate && this.setState({ returnCalendarActive: false })), 200)
  }
  toggleLocationDropDown(e) {
    e.target.name === 'origin' ? this.setState({ originDropDownActive: true, destinationDropDownActive: false }) : (e.target.name === 'destination' ? this.setState({ originDropDownActive: false, destinationDropDownActive: true }) : this.setState({ originDropDownActive: false, destinationDropDownActive: false }))
  }
  closeLocationDropDown(e) {
    setTimeout(() => (this.state.searchData.origin && this.setState({ originDropDownActive: false }) || this.state.searchData.destination && this.setState({ destinationDropDownActive: false })), 200)
  }
  suggestLocations(e) {
    console.log(e.target.value)
    axios.get(`https://api.skypicker.com/locations?term=${e.target.value}&locale=en-US&location_types=airport&location_types=country&location_types=city&limit=10&active_only=true&sort=name`)
      .then(res => this.setState({ locationSuggestions: res.data }))
      .catch(err => console.log(err))
  }
  clearLocationState(e) {
    console.log('clearing origin')
    this.searchData.setState({ origin: null })
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
    const { searchData, locationSuggestions, originDropDownActive, destinationDropDownActive, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, fakeFlighData, flightOnMap, defaultOrigin, clearLocationState } = this.state
    const { handleChange, handleDateChange, handleSubmit, toggleCalendar, closeCalendar, toggleMapDropDown, toggleLocationDropDown, closeLocationDropDown, suggestLocations } = this
    console.log('state', this.state)
    return (
      <section>
        <div className="navbar flex-row space-between">
          <div>
            <img className="logo" src="https://image.flaticon.com/icons/svg/68/68380.svg"></img>
            {this.state.searches && (
              <p className="small-text">{this.state.searches.length} searches and counting</p>
            )}
          </div>
          <RegionalSettings 
            handleChange = {handleChange}
          />
        </div>
        <div className="search-bar with-shadow half-high flex-column centered">
          <FlightSearchBar 
            {...{ searchData, locationSuggestions, originDropDownActive, destinationDropDownActive, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleCalendar, suggestLocations, toggleLocationDropDown, closeLocationDropDown, clearLocationState }}
          />
        </div>
        <div className="flex-column centered">
          {/* <ResultsCard
            flyFrom = {fakeFlighData.flyFrom}
            flyTo={fakeFlighData.flyTo}
            price={fakeFlighData.price}
            fly_duration={fakeFlighData.fly_duration}
            cityFrom={fakeFlighData.cityFrom}
            cityTo={fakeFlighData.cityTo}
            route={fakeFlighData.route}
            dTime={fakeFlighData.dTime}
            aTime={fakeFlighData.aTime}
          /> */}
          {this.state.loading && <LoadingScreen 
            message = {this.loadingMessage}/>}
          {this.state.flightResults && this.state.flightResults.data.map(flight => (
            <ResultsCard key={flight.id}
              {...flight}
              currency = {this.state.flightResults.currency}/>
          ))}
        </div>
        {/* <Map 
          data = {fakeFlighData}
          mapDropDown = {toggleMapDropDown}
          flightOnMap = {flightOnMap}
        /> */}
        {(!this.state.flightResults && !this.state.loading) &&
          <FlightSuggestions 
            defaultOrigin={defaultOrigin}
            searchData={searchData}
          />}
      </section>
    )
  }
}
export default Home

