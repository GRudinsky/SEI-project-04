import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

// class Calendar extends React.Component {
//   constructor() {
//     super()
//     const date = new Date()
//     const startDate = date.getTime()
//     this.state = {
//       startDate, // Today
//       endDate: new Date(startDate).setDate(date.getDate() + 6) // Today + 6 days
//     }

//   }
// onChange = (startDate, endDate) => this.setState({ startDate, endDate })

const Calendar = ({ handleChange, startDate, endDate }) => (

  <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={handleChange} range displayTime />
)

export default Calendar


