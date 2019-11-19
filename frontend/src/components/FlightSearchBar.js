import React from 'react'
import Calendar from './Calendar'
import SelectBox from './SelectBox'

import Select from 'react-select'

const FlightSearchBar = ({ searchData, locationOptions, toggleLocationDropDown, closeLocationDropDown, locationSuggestions, originDropDownActive, destinationDropDownActive, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleCalendar, suggestLocations }) => {
  return (
    <form className="container" value="form" onSubmit={handleSubmit} onFocus={toggleCalendar}>
      <div className="flex-row">
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" name="origin" 
              placeholder="From" 
              // value={searchData.origin}
              onChange={suggestLocations}
              onFocus={toggleLocationDropDown}
              onBlur={closeLocationDropDown}
              autoComplete="off"
            />
            {originDropDownActive && 
            <div className="flex-column absolute half-parent-wide cursor-pointer">
              {locationSuggestions && locationSuggestions.locations.map(location => (
                <div 
                  key={locationSuggestions.locations.indexOf(location)} 
                  title="origin"
                  id={location.code}
                  onClick={handleChange}>
                  {location.name} {location.type.charAt(0).toUpperCase() + location.type.slice(1)} - {location.code}
                </div>
              ))
              }
            </div>}
          </div>
        </div>
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" name="destination" 
              placeholder="To" 
              // value={searchData.destination} 
              onChange={suggestLocations}
              onFocus={toggleLocationDropDown}
              onBlur={closeLocationDropDown}
              autoComplete="off"
            />
            {destinationDropDownActive && 
            <div className="flex-column absolute half-parent-wide cursor-pointer with-shadow">
              {locationSuggestions && locationSuggestions.locations.map(location => (
                <div
                  key={locationSuggestions.locations.indexOf(location)}
                  title="destination"
                  id={location.code}
                  onClick={handleChange}>
                  {location.name} {location.type.charAt(0).toUpperCase() + location.type.slice(1)} - {location.code}
                </div>
              ))
              }
            </div>}
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