import React from 'react'
import LocationSearch from './LocationSearch'
import Calendar from './Calendar'
import Calendario from './Calendario'

const FlightSearchBar = ({ searchData, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleCalendar }) => {
  return (
    <form className="container" value="form" onSubmit={handleSubmit} onFocus={toggleCalendar}>
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
        {/* <Calendario handleChange={handleChange}
          dateFrom={searchData.departureDate} dateTo={searchData.returnDate}
          startDate={startDate} endDate={endDate}/> */}
        <div className="half-parent-wide">
          <input className="full-parent-wide" 
            type="text" 
            name="departureDate" 
            placeholder="Date From" 
            value={searchData.departureDate}
            onChange={handleChange} 
            onFocus={toggleCalendar} 
            autoComplete="off"
          />
          {departureCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive, closeCalendar }}
                  disableDates={date => date < new Date() - 86400000}
                />}
        </div>
        <div className="half-parent-wide">
          <div className="control">
            <input className="full-parent-wide" 
              type="text" 
              name="returnDate"
              placeholder="Date To" 
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