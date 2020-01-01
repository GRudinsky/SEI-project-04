console.log('Hello')
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Skeleton-2.0.4/css/normalize.css'
import './Skeleton-2.0.4/css/skeleton.css'
import './style.scss'
import Home from './components/Home'
import Register from './components/auth/Register'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)