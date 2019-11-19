import React from 'react'
import axios from 'axios'
// import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      navOpen: false,
      user: {},
      logout: false
    }
    // this.toggleNavbar = this.toggleNavbar.bind(this)
    // this.handleLogout = this.handleLogout.bind(this)
  }

  // toggleNavbar() {
  //   this.setState({ navOpen: !this.state.navOpen })
  // }

  // handleLogout() {
  //   Auth.logout()
  //   this.props.history.push('/')
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.setState({ navOpen: false })
  //     this.getUser()
  //   }
  // }

  // componentDidMount() {
  //   this.getUser()
  // }

  // getUser() {
  //   axios.get('api/profile', {
  //     headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(res => {
  //       this.setState({ user: res.data })
  //     })
  // }

  render() {

    return (
      <div>
        <div className="">
          <nav className="">
            <div className="Navbar__Link Navbar__Link-brand">
              {!Auth.isAuthenticated() && <Link className="logo" to="/">rekordr</Link>}
              {Auth.isAuthenticated() && <Link className="logo" to="/dashboard">rekordr</Link>}
            </div>
            <div className="Navbar__Link Nav-spacer"></div>
            <div className="Navbar__Link">
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/search">Search albums</Link>}
            </div>
            <div className="Navbar__Link">
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/users">View users</Link>}
            </div>
            <div className="Navbar__Link">
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
            </div>
          </nav>
          <nav className="Navbar__Items Navbar__Items--right">
            <div className="Navbar__Link logged-in">
              <div className="profile-element">{Auth.isAuthenticated() && <p className="navbar-item login-msg fade"> Logged in as {this.state.user.username} </p>}</div>
              <div className="profile-element navbar-item">{Auth.isAuthenticated() && <Link to="/dashboard" className="tiny-image-container"><img src={this.state.user.image} className="tiny-image"></img></Link>}</div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar)