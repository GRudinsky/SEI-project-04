import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import SplashScreen from '../common/SplashScreen'
import ProfileForm from './ProfileForm'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      loading: false,
      formData: {
        title: 'Login',
        noUserNameField: true,
        noImageField: true,
        noAddressField: true,
        noPasswordConfirmationField: true
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.setState({ splashMessage: res.data.message, loading: true })
        setTimeout(() => this.props.history.push('/dashboard'), 1000)
      })
      // .catch(err => console.log(err.message))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    if (this.state.loading) return (
      <SplashScreen
        message={this.state.splashMessage}
      />
    )
    return (
      <ProfileForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        profile={this.state.data}
        formData={this.state.formData}
        errors={this.state.errors}
      />
    )
  }
}

export default Login