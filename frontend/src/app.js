console.log('Hello')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import Home from './components/Home'

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)