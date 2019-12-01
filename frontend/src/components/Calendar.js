import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const Calendar = ({ handleDateChange, startDate, disableDates }) => (
  <div className="calendar absolute with-shadow">
    <ReactLightCalendar startDate={startDate} onChange={handleDateChange} disableDates={disableDates}/>
  </div>
) 

export default Calendar


