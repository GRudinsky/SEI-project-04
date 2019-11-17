import React from 'react'
import Calendar from './Calendar'

const FlightSearchBar = ({ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleCalendar }) => {
  return (
    <form className="container" value="form" onSubmit={handleSubmit} onFocus={toggleCalendar}>
      <div className="flex-row">
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" name="origin" 
              placeholder="From" 
              value={searchData.origin} 
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" name="destination" 
              placeholder="To" 
              value={searchData.destination} 
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" 
              name="departureDate" 
              placeholder="Departure" 
              value={searchData.departureDate}
              // value={departureCalendarActive && dateFrom}
              onChange={handleChange} 
              onFocus={toggleCalendar} 
              autoComplete="off"
            />
          </div>
          {departureCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive }}
                  disableDates={date => date < new Date() - 86400000}
                />}
        </div>
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" 
              name="returnDate" 
              placeholder="Return" 
              value={searchData.returnDate}
              // value={returnCalendarActive && dateFrom}
              onChange={handleChange} 
              onFocus={toggleCalendar} 
              autoComplete="off"
              // disabled
            />
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