console.log('Hello')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './Skeleton-2.0.4/css/normalize.css'
import './Skeleton-2.0.4/css/skeleton.css'
import './style.scss'
import Home from './components/Home'
// import AirportSearch from './components/Autocomplete'

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    {/* <Route path="/search" component={SearchResults} /> */}
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)