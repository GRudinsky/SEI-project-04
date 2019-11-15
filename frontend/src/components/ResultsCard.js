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

const ResultsCard = ( { ...flight } ) => (
  <div className="card flex-row fifty-wide twenty-high" key={flight.id}>
    <div className="flex-column twenty-percent-wide">
      <span className="small-text">Transfers:{flight.route.length - 1}</span>
      {flight.route && flight.route.map(fly => (
        <div className="small-text base-color" key={flight.route.indexOf(fly)}>
          {fly.flyFrom}⇢{fly.flyTo}
        </div>
      ))}
    </div>
    <div className="flex-row fifty-percent-wide">
      <div>
        <p className="small-text base-color"></p>
      </div>
      <div className="flex-column">
        <h5><span className="small-text base-color">{flight.cityFrom}</span>{flight.flyFrom} ⇢ {flight.flyTo}<span className="small-text base-color">{flight.cityTo}</span></h5>
        <p className="small-text base-color">{getDate(flight.dTime)} {getTime(flight.dTime)}  ⇢ {flight.fly_duration} ⇢ {getDate(flight.aTime)} {getTime(flight.aTime)} </p>
      </div>
      <div>
        <p className="small-text base-color"></p>
      </div>
    </div>
    <div className="flex-column thirty-percent-wide">
      <div>
        <h1>{flight.price}<span>{}</span></h1>
      </div>
      <div className="button button-primary">
        Book
      </div>
    </div>
  </div>
)
export default ResultsCard
