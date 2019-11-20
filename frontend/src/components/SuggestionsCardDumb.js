import React from 'react'
import axios from 'axios'


// async function getUrl(value) {
//   const obj = { 'string': value }
//   const responseUrl = []
//   console.log('Check 1')
//   await axios.get('/api/proxyimages/', obj)
//     .then(res => res.json())
//     .then(data => responseUrl.push(data.data.hits[0].webformatURL))
//   console.log(responseUrl)
// }


const getImage = (value) => {
  const obj = { 'string': value }
  const responseUrl = []
  axios.post('/api/proxyimages/', obj)
    .then(res => 
      responseUrl.push(res.data.hits[0].webformatURL))
    .catch(err => console.log('errors', err))
  console.log(responseUrl)
}


const getTime = (value) => {
  const time = new Date(value * 1000)
  return `${time.getHours() - 1}h ${time.getMinutes()}mins`
}
const getHoursOnly = (value) => {
  const time = new Date(value * 1000)
  return time.getHours()
}

const SuggestionsCard = ({ duration, conversion, price, cityTo }) => (
 
  <div className="card with-shadow quarter-parent-wide">
    <div className="with-background">
      <p>Up to {getHoursOnly(duration)} hours away:</p>
    </div>
    <div className = "image-tile" style={{ backgroundImage: `url${getImage(cityTo)}`, height: '250px', width: '250px' }}>
      <p>{cityTo}</p>
      {/* <div>{getUrl(cityTo)}</div> */}
      <h2>{price}{Object.keys(conversion)[0]}</h2>
    </div>
  </div>)
export default SuggestionsCard