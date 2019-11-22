import React from 'react'


const getDate = (value) => {
  const time = new Date(value * 1000)
  const month = time.toLocaleString('default', { month: 'short' })
  return `${time.getDate()} ${month}`
}

const getTime = (value) => {
  const time = new Date(value * 1000)
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const ResultsCard = ( { ...flight }, { currency } ) => (
  <div className="card with-shadow flex-row centered half-screen-wide quarter-screen-high margin-height-1v" key={flight.id}>
    <div className="flex-column centered quarter-parent-wide">
      <span className="small-text">Layovers:{flight.route.length - 1}</span>
      {flight.route && flight.route.map(fly => (
        <div className="small-text base-color flex-row space-around full-parent-wide " key={flight.route.indexOf(fly)}>
          <div className="left-margin">{fly.flyFrom}⇢{fly.flyTo}</div>  
          <div><img src={`https://images.kiwi.com/airlines/16x16/${fly.airline}.png`} />
          </div>
        </div>
      ))}
    </div>
   
    <div className="flex-column centered half-parent-wide">
      <h5><span className="small-text base-color">{flight.cityFrom}</span>{flight.flyFrom} <img src="https://image.flaticon.com/icons/png/16/61/61212.png"/> {flight.flyTo}<span className="small-text base-color">{flight.cityTo}</span></h5>
      <p className="small-text base-color">{getDate(flight.dTime)} {getTime(flight.dTime)}  ⇢ {flight.fly_duration} ⇢ {getDate(flight.aTime)} {getTime(flight.aTime)} </p>
    </div>
    <div className="flex-column centered quarter-parent-wide">
      <div>
        <h2>{flight.price}<span className="small-text base-color">{flight.conversion && Object.keys(flight.conversion)[0]}</span></h2>
      </div>
      <div className="button">
        Book
      </div>
    </div>
  </div>
)
export default ResultsCard
