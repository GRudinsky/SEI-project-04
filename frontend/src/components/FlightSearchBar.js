import React from 'react'
import LocationSearch from './LocationSearch'
import Calendar from './Calendar'

const FlightSearchBar = ({ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar, closeOnBlur }) => {
  return (
    <div className="search-bar with-shadow quarter-screen-high flex-column centered margin-bottom-1v" >
      <form className="container" value="form" onSubmit={handleSubmit} >
        <div className="flex-row">
          <div className="quarter-parent-wide">
            <LocationSearch 
              handleChange={handleChange}
              closeOnBlur={closeOnBlur}
              divTitle="origin"
            />
          </div>
          <div className="quarter-parent-wide">
            <LocationSearch
              handleChange={handleChange}
              closeOnBlur={closeOnBlur}
              divTitle="destination"
            />
          </div>
          <div className="quarter-parent-wide">
            <div 
              title="departureDate" 
              className="card full-parent-wide"
              id={searchData.departureDate} 
              onChange={handleChange}
              onClick={toggleDepartureCalendar} 
            >
              <p className="input-text base-color">{searchData.departureDate ? searchData.departureDate : 'Date From'}</p>
            </div>
            {departureCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive, closeOnBlur }}
                  divTitle="departureCalendar"
                  disableDates={date => date < new Date() - 86400000}
                />}
          </div>
          <div className="quarter-parent-wide">
            <div
              title="returntureDate"
              className="card without-margin full-parent-wide"
              id={searchData.returnDate}
              onChange={handleChange}
              onClick={toggleReturnCalendar}
            >
              <p className="input-text base-color">{searchData.returnDate ? searchData.returnDate : 'Date To'}</p>
            </div>
            {returnCalendarActive &&
                <Calendar
                  {...{ handleDateChange, departureCalendarActive, returnCalendarActive, closeOnBlur }}
                  disableDates={date => date < returnDateLimit}
                  startDate={endDate}
                  divTitle="returnCalendar"
                />}
          </div>
        </div>
        <div className="button button-primary" onClick={handleSubmit}>
            Submit
        </div>
      </form>
    </div>
  )
}

export default FlightSearchBar