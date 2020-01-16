import React from 'react'
import axios from 'axios'
import './SuggestionsCard.scss'

export default class SuggestionsCard extends React.Component {
  constructor({ props }) {
    super(props)
    this.state = {
      cardImage: null
    }
  }

  getImage(value) {
    const obj = { 'searchString': value }
    !this.state.cardImage && 
    axios.post('/api/proxy/imageSearch/', obj)
      .then(res => this.setState({ cardImage: res.data.hits[Math.floor(Math.random() * res.data.hits.length)].webformatURL }))
      .catch(err => console.log('errors', err))
  }

  componentDidMount() {
    this.getImage(this.props.cityTo)
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
    const { duration, conversion, price, cityTo } = this.props
    return (
      <div 
        id={this.getHoursOnly(duration)} 
        title={cityTo}
        className="card with-shadow quarter-parent-wide margin-width-1v margin-height-1v" 
        onClick={this.props.getMoreSuggestions}
      >
        <div>
          {this.getHoursOnly(duration)} {this.getHoursOnly(duration) === 1 ? 'hour' : 'hours'} away
        </div>
        <div>
          <img className="image-tile suggestion-card-image with-shadow full-parent-wide" src={this.state.cardImage}></img>
          <p className="without-margin">{cityTo}</p>
          <h3 className="without-margin">{price}<span className="small-text base-color">{Object.keys(conversion)[0]}</span></h3>
        </div>
      </div>
    )
  }
}