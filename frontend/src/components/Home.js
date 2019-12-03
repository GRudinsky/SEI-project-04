import React from 'react'
import axios from 'axios'
import CurrencySelector from './CurrencySelector'
import LoadingScreen from './Common/LoadingScreen'
import FlightSearchBar from './FlightSearchBar'
import ResultsCard from './ResultsCard'
import FlightSuggestions from './FlightSuggestions'
import '@lls/react-light-calendar/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

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
        origin: 'LON'
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
    this.searchFromMap = this.searchFromMap.bind(this)
    this.toggleDepartureCalendar = this.toggleDepartureCalendar.bind(this)
    this.toggleReturnCalendar = this.toggleReturnCalendar.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.toggleMapDropDown = this.toggleMapDropDown.bind(this)
    this.closeOnBlur = this.closeOnBlur.bind(this)
    this.setStorage = this.setStorage.bind(this)
    this.getStorage = this.getStorage.bind(this)
  }
  //form functions
  handleChange(e) {
    const searchData = e.target.name ? { ...this.state.searchData, [e.target.name]: e.target.value } : { ...this.state.searchData, [e.target.title]: e.target.id }
    console.log('title', e.target.id)
    console.log(this.state.searchData)
    this.setState({ searchData }, this.setStorage(e))
  }
  setStorage(e) {
    return e.target.name ? localStorage.setItem(e.target.name, e.target.value) : localStorage.setItem(e.target.title, e.target.id)
  }
  getStorage() {
    const searchData = { ...this.state.searchData }
    searchData.currency = localStorage.getItem('currency' || '')
    searchData.origin = localStorage.getItem('origin' || '')
    return this.setState({ searchData })
  }
  toggleLoadingScreen() {
    return this.setState({ loading: true })
  }
  searchFromMap() {
    const searchData = this.state.searchData
    searchData.departureDate = searchData.departureDate ? searchData.departureDate : localStorage.getItem('departureDate')
    searchData.returnDate = searchData.returnDate ? searchData.returnDate : searchData.departureDate
    this.setState({ searchData }, this.handleSubmit())
  }
  handleSubmit() {
    // e.prevetDefault()
    this.toggleLoadingScreen()
    axios.post('/api/proxy/flightSearch/', this.state.searchData)
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
        this.setState({ returnDateLimit: startDate, searchData: { ...this.state.searchData, departureDate: dateFrom, returnDate: endDate < startDate && dateFrom }, departureCalendarActive: false, endDate: endDate < startDate && startDate }, localStorage.setItem('departureDate', dateFrom))
      } else {
        this.setState({ searchData: { ...this.state.searchData, returnDate: dateFrom }, returnCalendarActive: false  })
      }
    })
  }
  toggleDepartureCalendar(e) {
    !this.state.departureCalendarActive ? this.setState({ departureCalendarActive: true, startDate: null, returnCalendarActive: false }, this.resetDepartureDate()) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
  }
  toggleReturnCalendar(e) {
    !this.state.returnCalendarActive ? this.setState({ departureCalendarActive: false, returnCalendarActive: true, endDate: null }) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
  }
  resetDepartureDate() {
    this.setState({ ...this.state.searchData, departureDate: null })
  }

  // Map functions
  toggleMapDropDown(e) {
    console.log(e.target.id)
    this.state.flightOnMap !== e.target.id ? this.setState({ flightOnMap: e.target.id }) : this.setState({ flightOnMap: '' })
  }
  closeOnBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log(e.relatedTarget)
    }
  }

  componentDidMount() {
    axios.get('api/searches')
      .then(res => this.setState({ searches: res.data }), this.getStorage())
      .catch(err => console.log(err))
  }

  render() {
    const { searchData, locationSuggestions, originDropDownActive, destinationDropDownActive, startDate, endDate, departureCalendarActive, returnDateLimit, returnCalendarActive, fakeFlighData, flightOnMap, clearLocationState } = this.state
    const { handleChange, handleDateChange, handleSubmit, toggleDepartureCalendar, toggleReturnCalendar, closeCalendar, toggleMapDropDown, toggleLocationDropDown, closeLocationDropDown, suggestLocations, closeOnBlur } = this
    console.log('state', this.state)
    return (
      <section className="flex-column space-between full-height">
        <header className="navbar tenth-screen-high flex-row space-between">
          <div className="margin-width-1v">
            <h5 className="logo without-margin bold-font">find_That_flight <FontAwesomeIcon icon={faPaperPlane} /></h5>
            {this.state.searches && (
              <p className="small-text without-margin">{this.state.searches.length} searches and counting</p>
            )}
          </div>
          <div className="flex-column centered margin-width-1v">
            <CurrencySelector 
              handleChange = {handleChange}
              currency = {searchData.currency}
            />
          </div>
        </header>
        <FlightSearchBar 
          {...{ searchData, locationSuggestions, originDropDownActive, destinationDropDownActive, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar, suggestLocations, toggleLocationDropDown, closeLocationDropDown, clearLocationState, closeOnBlur }}
        />
  
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
        <div className="flex-column centered">
          {(!this.state.flightResults && !this.state.loading) &&
          <FlightSuggestions 
            handleChange={handleChange}
            searchFromMap={this.searchFromMap}
            searchData={searchData}
          />}
        </div>
        <footer className="footer with-shadow tenth-screen-high flex-row flex-end">
          <div className="flex-column centered margin-width-1v">
            <p className="small-text without-margin ">GRudinsky 2019</p>
          </div>
        </footer>
      </section>
    )
  }
}
export default Home

