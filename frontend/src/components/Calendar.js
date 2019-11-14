import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const Calendar = ({ handleChange, startDate, endDate, disableDates }) => (
  <div className="calendar absolute">
    <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={handleChange} disableDates={disableDates}/>
  </div>
) 

export default Calendar


