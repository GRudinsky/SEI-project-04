import React from 'react'
import Loader from '../Loader/Loader'
import './loadingScreen.scss'

const LoadingScreen = ({ message }) => (
  <section className="flex-column centered">
    <div className= "flex-column centered">
      <h3 className="title">{message}</h3>
      <Loader/>
    </div>
  </section>
)
export default LoadingScreen