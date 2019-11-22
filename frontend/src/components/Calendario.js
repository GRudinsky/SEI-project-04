import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

class Calendario extends React.Component{
  constructor() {
    super()
    this.state = {
      dateFrom: null,
      dateTo: null,
      startDate: null,
      endDate: null,
      calendarActive: false
    }
    this.toggleCalendar = this.toggleCalendar.bind(this)
    // this.handledateChange = this.handledateChange.bind(this)

  }
  getDate(value) {
    const time = new Date(value)
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
  }
  toggleCalendar() {
    !this.state.calendarActive ? this.setState({ calendarActive: true }) : this.setState({ calendarActive: false })
  }
  // handleDateChange(startDate, endDate) {
  //   this.props.dateFrom = this.getDate(startDate)
  //   this.props.dateTo = this.getDate(endDate)
  // }
  render() {
    const { calendarActive } = this.state
    const { toggleCalendar } = this
    return (
      <div className="half-parent-wide">
        <div 
          className="button full-parent-wide"
          title="departureDate"
          onClick={toggleCalendar}>
        </div>
        {calendarActive && <div className="calendar absolute">
          <ReactLightCalendar 
            startDate={this.props.startDate} 
            endDate={this.props.endDate} 
            disableDates={this.props.disableDates} 
            handleDateChange={this.props.handleDateChange}
          />
        </div>}
      </div>
    )
  }
}
export default Calendario
