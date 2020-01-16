import React from 'react'
import axios from 'axios'

import ProfileForm from './ProfileForm/ProfileForm'
import LoadingScreen from '../../common/LoadingScreen/LoadingScreen'

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      formData: {
        title: 'Register'
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  takeToPage(arg) {
    setTimeout(() => this.props.history.push(arg), 2000)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(res => this.setState({ loading: true, loadingMessage: res.data.message }))
      .then(() => this.takeToPage('/'))
      .catch(err => this.setState({ loadingErrors: err.response.data }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render() {
    return (
      <>
      {this.state.loading && 
      <LoadingScreen 
        message = {this.state.loadingMessage}
      />
      }
      {!this.state.loading &&
      <ProfileForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        profile={this.state.data}
        formData={this.state.formData}
        errors={this.state.errors}
      />
      }
      </>
    )
  }
}