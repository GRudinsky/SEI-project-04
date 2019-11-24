import React from 'react'
import LocationSearch from './LocationSearch'
import Calendar from './Calendar'

const FlightSearchBar = ({ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar }) => {
  return (
    <form className="container" value="form" onSubmit={handleSubmit} >
      <div className="flex-row">
        <div className="half-parent-wide">
          <LocationSearch 
            handleChange={handleChange}
            divTitle="origin"
          />
        </div>
        <div className="half-parent-wide">
          <LocationSearch
            handleChange={handleChange}
            divTitle="destination"
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="half-parent-wide">
          <div 
            title="departureDate" 
            className="card full-parent-wide"
            id={searchData.departureDate} 
            onChange={handleChange}
            onClick={toggleDepartureCalendar} 
          >
            <p className="input-text base-color">{searchData.departureDate ? searchData.departureDate : 'Departure From Date'}</p>
          </div>
          {departureCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar }}
                  disableDates={date => date < new Date() - 86400000}
                />}
        </div>
        <div className="half-parent-wide">
          <div
            title="returntureDate"
            className="card without-margin full-parent-wide"
            id={searchData.returnDate}
            onChange={handleChange}
            onClick={toggleReturnCalendar}
          >
            <p className="input-text base-color">{searchData.returnDate ? searchData.returnDate : 'Departure To Date:'}</p>
          </div>
          {returnCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive }}
                  disableDates={date => date < returnDateLimit}
                />}
        </div>
      </div>
      <div className="button button-primary" onClick={handleSubmit}>
            Submit
      </div>
    </form>
  )
}

export default FlightSearchBar