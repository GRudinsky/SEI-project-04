import React from 'react'

const LoadingScreen = ({ message }) => (
  <section className="flex-column centered">
    <div className= " flex-column centered">
      <h3 className="title">{message}</h3>
      <div className="loader"></div>
    </div>
  </section>
)
export default LoadingScreen