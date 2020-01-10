import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Skeleton-2.0.4/css/normalize.css'
import './Skeleton-2.0.4/css/skeleton.css'
import './styles/style.scss'
import Home from './components/Home/Home'
import Register from './components/auth/Register/Register'
import Footer from './components/common/Footer/Footer'

const App = () => (
  <>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
  <Footer />
  </>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)