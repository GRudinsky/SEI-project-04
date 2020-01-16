import React from 'react'
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

const DepCalendar = ({ searchData, errors, handleChange, toggleDepartureCalendar, handleDateChange, startDate, disableDates, divTitle, departureCalendarActive }) => (
  <div>
    <div
      title={divTitle}
      className="card full-parent-wide"
      id={divId}
      onChange={handleChange}
      onClick={toggleDepartureCalendar}
    >
      <p className="input-text base-color">{searchData.departureDate ? searchData.departureDate : 'Date From'}</p>
    </div >
    { errors.departure_date && <p className="small-text danger">{errors.departure_date}</p> }
    {departureCalendarActive &&
    <div className="calendar absolute with-shadow" id={divTitle}>
      <ReactLightCalendar startDate={startDate} onChange={handleDateChange} disableDates={disableDates} />
    </div>}
  </div>
) 

export default DepCalendar


