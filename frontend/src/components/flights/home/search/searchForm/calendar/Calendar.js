import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const Calendar = ({ handleDateChange, startDate, disableDates, divTitle }) => (
  <div className="calendar absolute with-shadow" id={divTitle}>
    <ReactLightCalendar startDate={startDate} onChange={handleDateChange} disableDates={disableDates}/>
  </div>
) 

export default Calendar


