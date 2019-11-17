import React from 'react'
import axios from 'axios'

import SplashScreen from '../common/SplashScreen'
import ProfileForm from './ProfileForm'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordconfirmation: '',
        image: '',
        address: ''
      },
      loading: false,
      formData: {
        title: 'Register'
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(res => this.setState({ splashMessage: res.data.message, loading: true }))
      .then(() => {
        setTimeout(() => this.props.history.push('/login'), 1000)
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    // console.log(errors)
    this.setState({ data })
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

export default Register