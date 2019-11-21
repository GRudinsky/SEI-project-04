console.log('Hello')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './Skeleton-2.0.4/css/normalize.css'
import './Skeleton-2.0.4/css/skeleton.css'
import './style.scss'
import Home from './components/Home'
import FontAwesome from 'react-fontawesome'
// import AirportSearch from './components/Autocomplete'

const App = () => (
  <BrowserRouter>
    {/* <Route path="/search" component={AirportSearch} /> */}
    <Route exact path="/" component={Home} />

  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)