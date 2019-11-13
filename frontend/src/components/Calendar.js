import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const Calendar = ({ handleChange, startDate, endDate }) => (

  <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={handleChange} range displayTime />
)

export default Calendar


