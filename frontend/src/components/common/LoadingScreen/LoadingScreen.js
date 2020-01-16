import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import './loadingScreen.scss'

const LoadingScreen = ({ message }) => (
  <section className="flex-column centered">
    <div className= "flex-column centered">
      <h3 className="title">{message}</h3>
      <div className="spinning-loader">
        {/* <div className="spin-object"><FontAwesomeIcon icon={faPlane}/></div> */}
      </div>
      {/* <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </div>
  </section>
)
export default LoadingScreen