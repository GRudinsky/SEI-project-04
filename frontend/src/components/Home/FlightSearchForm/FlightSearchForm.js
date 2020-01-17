import React from 'react'
import LocationSearch from './LocationSearch/LocationSearchHooks'
import ValidationError from '../../common/ValidationError/ValidationError'
import Calendar from './Calendar/Calendar'
import './FlightSearchForm.scss'

const FlightSearchForm = ({ searchData, errors, startDate, endDate, departureCalendarActive, returnCalendarActive, returnDateLimit, handleSubmit, handleChange, handleDateChange, toggleDepartureCalendar, toggleReturnCalendar, closeOnBlur }) => {
  return (
    <div className="search-bar with-shadow quarter-screen-high flex-column centered margin-bottom-1v" >
      <form className="container" value="form" onSubmit={handleSubmit} >
        <div className="flex-row">
          <div className="quarter-parent-wide">
            <LocationSearch 
              handleChange={handleChange}
              closeOnBlur={closeOnBlur}
              divTitle="origin"
              validationCondition={errors.origin}
            />
          </div>
          <div className="quarter-parent-wide">
            <LocationSearch
              handleChange={handleChange}
              closeOnBlur={closeOnBlur}
              divTitle="destination"
              validationCondition={errors.destination}
            />
          </div>
          <div className="twenty-percent-wide">
            <div 
              title="departureDate" 
              className="date-input full-parent-wide"
              id={searchData.departureDate} 
              onChange={handleChange}
              onClick={toggleDepartureCalendar} 
            >
              <p className="input-text base-color">{searchData.departureDate ? searchData.departureDate : 'Date From'}</p>
            </div>
            <ValidationError validationCondition={errors.departure_date}/>
            {departureCalendarActive &&
                <Calendar
                  {...{ handleDateChange, startDate, endDate, departureCalendarActive, returnCalendarActive, closeOnBlur }}
                  divTitle="departureCalendar"
                  disableDates={date => date < new Date() - 86400000}
                />}
          </div>
          <div className="twenty-percent-wide">
            <div
              title="returntureDate"
              className="date-input full-parent-wide"
              id={searchData.returnDate}
              onChange={handleChange}
              onClick={toggleReturnCalendar}
            >
              <p className="input-text base-color">{searchData.returnDate ? searchData.returnDate : 'Date To'}</p>
            </div>
            <ValidationError validationCondition={errors.return_date} />
            {returnCalendarActive &&
                <Calendar
                  {...{ handleDateChange, departureCalendarActive, returnCalendarActive, closeOnBlur }}
                  disableDates={date => date < returnDateLimit}
                  startDate={endDate}
                  divTitle="returnCalendar"
                />}
          </div>
          <div className="button button-primary" onClick={handleSubmit}>
            Submit
          </div>
        </div>
       
      </form>
    </div>
  )
}

export default FlightSearchForm