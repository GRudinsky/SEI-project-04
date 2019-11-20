import React from 'react'
import axios from 'axios'

class SuggestionsCard extends React.Component {
  constructor({ price, duration, conversion, cityTo }) {
    super(price, duration, conversion, cityTo)
    this.state = {
      backgroundImage: null
    }
    this. price = price 
    this.duration = duration
    this.conversion = conversion
    this.cityTo = cityTo
  }

  getImage(value) {
    const obj = { 'string': value }
    !this.state.backgroundImage && 
    axios.post('/api/proxyimages/', obj)
      .then(res => this.setState({ backgroundImage: res.data.hits[Math.floor(Math.random() * res.data.hits.length)].webformatURL }))
      .catch(err => console.log('errors', err))
  
  }

  componentDidMount(){
    this.getImage(this.cityTo)
  }
  getTime(value) {
    const time = new Date(value * 1000)
    return `${time.getHours() - 1}h ${time.getMinutes()}mins`
  }
  getHoursOnly(value){
    const time = new Date(value * 1000)
    return time.getHours()
  }
  render () {
    const { duration, conversion, price, cityTo } = this
    console.log('state', this.state)
    // if (!duration) return null
    return (
      <div className="card with-shadow quarter-parent-wide">
        <div className="with-background">
          Up to {this.getHoursOnly(duration)} hours away:
        </div>
        <div>
          <img className="image-tile suggestion-card-image full-parent-wide" src={this.state.backgroundImage}></img>
          <p className="without-margin">{cityTo}</p>
          <h2>{price}{Object.keys(conversion)[0]}</h2>
        </div>
      </div>
    )
  }
}
export default SuggestionsCard