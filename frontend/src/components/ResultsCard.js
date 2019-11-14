import React from 'react'
const ResultsCard = ({ ...flight }) => (
  <div key={flight.id}>
    <p>{flight.flyFrom}</p>
    <p>{flight.flyTo}</p>
  </div>
)
export default ResultsCard