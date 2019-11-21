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

  }
  getDate(value) {
    const time = new Date(value)
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
  }
  toggleCalendar(e) {
    !this.state.calendarActive ? this.setState({ calendarActive: true }) : this.setState({ calendarActive: false })
  }
  handleDateChange(startDate, endDate) {
    this.props.dateFrom = this.getDate(startDate)
    this.props.dateTo = this.getDate(endDate)
  }
  render() {
    const { calendarActive } = this.state
    const { toggleCalendar, handleDateChange } = this
    return (
      <div className="half-parent-wide">
        <input className="full-parent-wide"
          type="text"
          name="departureDate"
          placeholder="Date From"
          value={this.props.date}
          onChange={this.props.handleChange}
          onFocus={toggleCalendar}
          autoComplete="off"
        />
        {calendarActive && <div className="calendar absolute">
          <ReactLightCalendar startDate={this.props.startDate} endDate={this.props.endDate} onChange={handleDateChange} disableDates={this.props.disableDates} />
        </div>}
      </div>
    )
  }
}
export default Calendario
