import React from 'react'
import axios from 'axios'
import CurrencySelector from './CurrencySelector'
import LoadingScreen from './Common/LoadingScreen'
import FlightSearchBar from './FlightSearchBar'
import SearchResults from './SearchResults'
import FlightSuggestions from './FlightSuggestions'
import '@lls/react-light-calendar/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      flightResults: null,
      loading: false,
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
      dateTo: null,
      loadingMessage: 'We are getting your flight...'
    },
    this.suggestionsData =  {
      defaultOrigin: 'LON',
      defaultCurrency: 'EUR',
      defaultWeeksAhead: 2
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchFromMap = this.searchFromMap.bind(this)
    this.toggleDepartureCalendar = this.toggleDepartureCalendar.bind(this)
    this.toggleReturnCalendar = this.toggleReturnCalendar.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.closeOnBlur = this.closeOnBlur.bind(this)
    this.setStorage = this.setStorage.bind(this)
    this.getStorage = this.getStorage.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
  }
  //form functions
  handleChange(e) {
    const searchData = e.target.name ? { ...this.state.searchData, [e.target.name]: e.target.value } : { ...this.state.searchData, [e.target.title]: e.target.id }
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

  searchFromMap() {
    const searchData = this.state.searchData
    searchData.currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : this.suggestionsData.defaultCurrency
    searchData.origin = localStorage.getItem('origin') ? localStorage.getItem('origin') : this.suggestionsData.defaultOrigin
    searchData.departureDate = localStorage.getItem('departureDate') ? localStorage.getItem('departureDate') : this.getDateFromWeeksAhead(this.suggestionsData.defaultWeeksAhead)
    searchData.returnDate = searchData.departureDate
    this.setState({ searchData }, this.handleSubmit())
  }
  handleSubmit() {
    // e.prevetDefault()
    this.setState({ flightResults: null, loading: true }, this.getFlightResults())
  }
  getFlightResults() {
    console.log('submitting', this.state.searchData)
    axios.post('/api/proxy/flightSearch/', this.state.searchData)
      .then(res => this.setState({ flightResults: res.data, loading: false }), this.pushSearchtoDB())
      .catch(err => this.setState({ errors: err.message, loadingMessage: 'Ooops, something went wrong...' }))
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
  getDateFromWeeksAhead(arg) {
    const time = new Date(Number(new Date) + arg * 7 * 86400000)
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
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
  toggleDepartureCalendar() {
    !this.state.departureCalendarActive ? this.setState({ departureCalendarActive: true, startDate: null, returnCalendarActive: false }, this.resetDepartureDate()) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
  }
  toggleReturnCalendar() {
    !this.state.returnCalendarActive ? this.setState({ departureCalendarActive: false, returnCalendarActive: true, endDate: null }) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
  }
  resetDepartureDate() {
    this.setState({ ...this.state.searchData, departureDate: null })
  }

  closeOnBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // console.log(e.relatedTarget, e.currentTarget)
    }
  }
  refreshPage() {
    window.location.reload(false)
  } 
  componentDidMount() {
    axios.get('api/searches')
      .then(res => this.setState({ searches: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    const { searchData, startDate, endDate, departureCalendarActive, returnDateLimit, returnCalendarActive } = this.state
    const { handleChange, handleDateChange, handleSubmit, toggleDepartureCalendar, toggleReturnCalendar } = this
    // console.log('state', this.state)
    return (
      <section className="flex-column space-between full-height">
        <header className="navbar tenth-screen-high flex-row space-between">
          <div className="logo margin-width-1v" onClick={this.refreshPage}>
            <h5 className="without-margin bold-font italic-font">find_That_flight <FontAwesomeIcon icon={faPaperPlane} /></h5>
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
          {...{ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar }}
        />
        <div className="flex-column centered full-parent-high">
          {(this.state.loading || this.state.errors) && 
          <LoadingScreen 
            message = {this.state.loadingMessage}/>}
          {this.state.flightResults && 
          <SearchResults 
            flightResults = {this.state.flightResults}/>}          
        </div>
        <div className="flex-column centered">
          {(!this.state.flightResults && !this.state.loading) &&
          <FlightSuggestions 
            handleChange={handleChange}
            searchFromMap={this.searchFromMap}
            suggestionsData={this.suggestionsData}
            searchData={searchData}
            defaultDate={this.getDateFromWeeksAhead(this.suggestionsData.defaultWeeksAhead)}
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

