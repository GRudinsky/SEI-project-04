import React from 'react'
import axios from 'axios'

import Calendar from './Calendar'
import '@lls/react-light-calendar/dist/index.css'

class Home extends React.Component {
  constructor() {
    super()
    const date = new Date()
    // const startDate = date.getTime()
    this.state = {
      flightResults: null
      // startDate,
      // endDate: new Date(startDate).setDate(date.getDate() + 6)
      
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  //form functions
  handleChange(startDate, endDate) {
    this.setState({ startDate, endDate })
  }

  handleSubmit(e) {
    e.prevetDefault()
    console.log(e.target.value)
    axios.get('/api/proxyflights')
      .then(res => this.setState({ flightResults: res.json() }))
      .catch(err => console.log('errors', err))
  }

  render() {

   

    // fetch('/api/proxyflights')
    //   .then(res => res.json())
    //   .then(res => console.log('response', res))
    //   .catch(err => console.log(err))

    console.log('state', this.state)

    return (
      <form 
        value='form'
        onSubmit={this.handleSubmit}
      >
        <Calendar 
          handleChange = {this.handleChange}
          startDate = {this.state.startDate}
          endDate = {this.state.endDate}/>
        <button className="button">Submit</button>
      </form>
    )
  }

}
export default Home

