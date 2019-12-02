import React from 'react'
import ReactMapGL, { Marker, Popup, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import axios from 'axios'

import 'mapbox-gl/dist/mapbox-gl.css'


class Map extends React.Component {
  constructor({ ...props }) {
    super({ props })
    this.state = {
      viewport: {
        width: 800,
        height: 400,
        latitude: 59,
        longitude: 78,
        zoom: 10,
        bearing: 0,
        pitch: 0
      }
    }
    this.displayImage = this.displayImage.bind(this)
  }

  flyToBoundaries() {
    const viewport = { 
      ...this.state.viewport, 
      longitude: this.props.lng, 
      latitude: this.props.lat, 
      zoom: this.props.zoom,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator() // or LinearInterpolator()
    }
    this.setState({ viewport })
  }
  componentDidMount() {
    this.flyToBoundaries()
  }
  componentDidUpdate(prevProps) {
    if (this.props.lng !== prevProps.lng) {
      this.flyToBoundaries()
    }
  }
  getImage(value) {
    const obj = { 'searchString': value }
    axios.post('/api/proxy/imageSearch/', obj)
      .then(res => this.setState({ popupImage: res.data.hits[Math.floor(Math.random() * res.data.hits.length)].webformatURL }))
      .catch(err => console.log('errors', err))
  }
  displayImage(e) {
    console.log('popup value', e.target.id)
    this.getImage(e.target.id)
  }

  render() {
    const { data, lat, lng, bounds } = this.props
    console.log(this.state)
    return (
      <div>
        <div className="flex-row centered with-shadow">
          <ReactMapGL
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}
            renderChildrenInPortal={true}
          >
            {/* <Marker
              latitude={lat}
              longitude={lng}
            >
              <div className="marker">Mid</div>
            </Marker>
            <Marker
              latitude={lat}
              longitude={lng}
            >
              <div className="marker"></div>
            </Marker>
            <Marker
              longitude={bounds[1][0]}
              latitude={bounds[1][1]}
            >
              <div className="marker">NE</div>
            </Marker>
            <Marker
              longitude={bounds[0][0]}
              latitude={bounds[0][1]}
            >
              <div className="marker">SW</div>
            </Marker> */}
            {data && data.map(point => (
              <Popup
                key={point.id}
                value={point.cityTo}
                latitude={point.route[0].latTo}
                longitude={point.route[0].lngTo}
                closeButton={false}
                // anchor="top"
                sortByDepth={true}
                className="map-popup"
                captureClick={true}
              >
                <div 
                  id={point.cityTo}
                  className="small-text without-margin"
                  onMouseEnter={this.displayImage}
                >
                  {point.cityTo}, {point.price}{Object.keys(point.conversion)[0]}</div>
                {/* <img className="image-tile suggestion-card-image with-shadow quarter-parent-wide without-margin" src={this.state.popupImage && this.state.popupImage}></img> */}
              </Popup>))}
          </ReactMapGL>
        </div>
      </div>
    )
  }
}
export default Map