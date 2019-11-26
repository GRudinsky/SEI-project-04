import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const Calendar = ({ handleDateChange, startDate, endDate, disableDates }) => (
  <div className="calendar absolute with-shadow">
    <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={handleDateChange} disableDates={disableDates}/>
  </div>
) 

export default Calendar


