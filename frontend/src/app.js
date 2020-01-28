import React, { lazy, Suspense }  from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/Skeleton-2.0.4/css/normalize.css'
import './styles/Skeleton-2.0.4/css/skeleton.css'
import './styles/style.scss'
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen'
const Home = lazy(() => import('./components/Home/Home'))
// import Register from './components/auth/Register/Register'
import Footer from './components/common/Footer/Footer'

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="full-height flex-column centered"><LoadingScreen message='Loading...'/></div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/register" component={Register} /> */}
      </Switch>
      <Footer />
    </Suspense>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)