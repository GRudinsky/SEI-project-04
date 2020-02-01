import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header/Header'
import LoadingScreen from '../common/LoadingScreen/LoadingScreen'
import FlightSearchForm from './FlightSearchForm/FlightSearchForm'
import SearchResults from './SearchResults/SearchResults'
import FlightSuggestions from './FlightSuggestions/FlightSuggestions'
import './Home.scss'

const data = {
  user: 'undefined',
  currency: 'EUR',
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: ''
}

const suggestionsData = {
  defaultOrigin: 'LON',
  defaultCurrency: 'EUR',
  defaultWeeksAhead: 2
}

export default function Home() {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') ? localStorage.getItem('currency') : suggestionsData.defaultCurrency)
  const [flightResults, setFlightResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState(data)
  const [searches, setSearches] = useState(null)
  const [errors, setErrors] = useState({})
  const [departureCalendarActive, setDepartureCalendarActive] = useState(false)
  const [returnCalendarActive, setReturnCalendarActive] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('We are getting your flight...')

  useEffect(() => {
    axios.get('api/searches')
      .then(res => setSearches(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const storage = { ...searchData }
    storage.currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : suggestionsData.defaultCurrency
    storage.origin = localStorage.getItem('origin') ? localStorage.getItem('origin') : suggestionsData.defaultOrigin
    setSearchData({ ...storage } )
  }, [searches])
  
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [input])

  useEffect(() => {
    console.log(searchData, currency)
  }, [searchData, currency])


  return (
    <Header
      searches={searches}
      _onChange={(e) => setCurrency(e.target.value)}
      currency={currency}
      // refreshPage={refreshPage}
    />
  )
}

// export default class Home extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       flightResults: null,
//       loading: false,
//       searchData: {
//         user: 'undefined',
//         currency: 'EUR',
//         origin: '',
//         destination: '',
//         departureDate: '',
//         returnDate: ''
//       },
//       errors: {
//         // origin: null,
//         // destination: null,
//         // departure_date: null
//       },
//       departureCalendarActive: false,
//       returnCalendarActive: false,
//       startDate: null,
//       endDate: null,
//       returnDateLimit: null,
//       dateFrom: null,
//       dateTo: null,
//       loadingMessage: 'We are getting your flight...'
//     },
//     this.suggestionsData =  {
//       defaultOrigin: 'LON',
//       defaultCurrency: 'EUR',
//       defaultWeeksAhead: 2
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.searchFromMap = this.searchFromMap.bind(this)
//     this.toggleDepartureCalendar = this.toggleDepartureCalendar.bind(this)
//     this.toggleReturnCalendar = this.toggleReturnCalendar.bind(this)
//     this.handleDateChange = this.handleDateChange.bind(this)
//     this.setStorage = this.setStorage.bind(this)
//   }
 
//   handleChange(e) {
//     const searchData = e.target.name ? { ...this.state.searchData, [e.target.name]: e.target.value } : { ...this.state.searchData, [e.target.title]: e.target.id }
//     this.setState({ searchData }, this.setStorage(e))
//   }
//   setStorage(e) {
//     return e.target.name ? localStorage.setItem(e.target.name, e.target.value) : localStorage.setItem(e.target.title, e.target.id)
//   }
//   getStorage() {
//     const searchData = { ...this.state.searchData }
//     searchData.currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : this.suggestionsData.defaultCurrency
//     searchData.origin = localStorage.getItem('origin') ? localStorage.getItem('origin') : this.suggestionsData.defaultOrigin
//     return this.setState({ searchData })
//   }

//   searchFromMap() {
//     const searchData = this.state.searchData
//     searchData.currency = localStorage.getItem('currency') ? localStorage.getItem('currency') : this.suggestionsData.defaultCurrency
//     searchData.origin = localStorage.getItem('origin') ? localStorage.getItem('origin') : this.suggestionsData.defaultOrigin
//     searchData.departureDate = localStorage.getItem('departureDate') ? localStorage.getItem('departureDate') : this.getDateFromWeeksAhead(this.suggestionsData.defaultWeeksAhead)
//     searchData.returnDate = searchData.departureDate
//     this.setState({ searchData }, this.handleSubmit())
//   }
//   handleSubmit() {
//     this.setState({ flightResults: null, loading: true }, this.resetErrors())
//   }
//   resetErrors() {
//     const { searchData, errors } = this.state
//     const err = { ...errors,
//       origin: searchData.origin !== '' ? null : errors.origin,
//       destination: searchData.destination !== '' ? null : errors.destination,
//       departure_date: searchData.departureDate !== '' ? null : errors.departure_date
//     }
//     this.setState({ errors: err }, this.getFlightResults())
//   }
//   getFlightResults() {
//     axios.post('/api/proxy/flightSearch/', this.state.searchData)
//       .then(res => this.setState({ flightResults: res.data, loading: false }), this.pushSearchtoDB())
//       .catch(err => this.setState({ errors: err.response.data, loading: false }))
//   }
//   pushSearchtoDB(){
//     axios.post('/api/searches', this.state.searchData)
//       .then(res => console.log(res))
//       .catch(err => console.log('errors', err))
//   }
//   getDate(value) {
//     const time = new Date(value)
//     return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
//   }
//   getTime(value) {
//     const time = new Date(value)
//     return `${time.getHours()}:${time.getMinutes()}`
//   }
//   getDateFromWeeksAhead(arg) {
//     const time = new Date(Number(new Date) + arg * 7 * 86400000)
//     return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
//   }
//   handleDateChange(startDate, endDate) {
//     const dateFrom = this.getDate(startDate)
//     const dateTo = this.getDate(endDate)
//     this.setState({ startDate, endDate, dateFrom, dateTo }, () => {
//       if (this.state.departureCalendarActive) {
//         this.setState({ returnDateLimit: startDate, searchData: { ...this.state.searchData, departureDate: dateFrom, returnDate: endDate < startDate && dateFrom }, departureCalendarActive: false, endDate: endDate < startDate && startDate }, localStorage.setItem('departureDate', dateFrom))
//       } else {
//         this.setState({ searchData: { ...this.state.searchData, returnDate: dateFrom }, returnCalendarActive: false  })
//       }
//     })
//   }
//   toggleDepartureCalendar() {
//     !this.state.departureCalendarActive ? this.setState({ departureCalendarActive: true, startDate: null, returnCalendarActive: false }, this.resetDepartureDate()) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
//   }
//   toggleReturnCalendar() {
//     !this.state.returnCalendarActive ? this.setState({ departureCalendarActive: false, returnCalendarActive: true, endDate: null }) : this.setState({ departureCalendarActive: false, returnCalendarActive: false })
//   }
//   resetDepartureDate() {
//     this.setState({ ...this.state.searchData, departureDate: null })
//   }
//   refreshPage() {
//     window.location.reload(false)
//   } 
//   componentDidMount() {
//     axios.get('api/searches')
//       .then(res => this.setState({ searches: res.data }), this.getStorage())
//       .catch(err => console.log(err))
//   }
//   render() {
//     const { loading, loadingMessage, errors,loadingErrors, searchData, startDate, endDate, searches, flightResults, departureCalendarActive, returnDateLimit, returnCalendarActive } = this.state
//     const { handleChange, handleDateChange, handleSubmit, toggleDepartureCalendar, toggleReturnCalendar, refreshPage, searchFromMap, suggestionsData } = this
//     return (
//       <section className="home flex-column space-between">
//         <Header
//           searches = {searches}
//           handleChange = {handleChange}
//           currency = {searchData.currency}
//           refreshPage = {refreshPage}
//         />
//         <FlightSearchForm 
//           {...{ searchData, errors, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar }}
//         />
//         <div className="content flex-column centered full-parent-high">
//           {(loading || loadingErrors) && 
//           <LoadingScreen 
//             message = {loadingMessage}/>}
//           {flightResults && 
//           <SearchResults 
//             flightResults = {flightResults}/>}          
//           {(!flightResults && !loading) &&
//           <FlightSuggestions 
//             handleChange={handleChange}
//             searchFromMap={searchFromMap}
//             suggestionsData={suggestionsData}
//             searchData={searchData}
//             defaultDate={this.getDateFromWeeksAhead(suggestionsData.defaultWeeksAhead)}
//           />}
//         </div>
//       </section>
//     )
//   }
// }

