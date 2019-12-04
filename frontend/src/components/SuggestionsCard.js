import React from 'react'
import axios from 'axios'

export default class SuggestionsCard extends React.Component {
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
    const obj = { 'searchString': value }
    !this.state.backgroundImage && 
    axios.post('/api/proxy/imageSearch/', obj)
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
    // console.log('state', this.state)
    // if (!duration) return null
    return (
      <div id={this.getHoursOnly(duration)} className="card with-shadow quarter-parent-wide margin-width-1v margin-height-1v" 
        onClick={this.props.getMoreSuggestions}>
        <div>
          {this.getHoursOnly(duration)} {this.getHoursOnly(duration) === 1 ? 'hour' : 'hours'} away
        </div>
        <div>
          <img className="image-tile suggestion-card-image with-shadow full-parent-wide" src={this.state.backgroundImage}></img>
          <p className="without-margin">{cityTo}</p>
          <h3 className="without-margin">{price}<span className="small-text base-color">{Object.keys(conversion)[0]}</span></h3>
        </div>
      </div>
    )
  }
}