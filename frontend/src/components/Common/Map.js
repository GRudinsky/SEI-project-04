import React from 'react'
import ReactMapGL, { Marker, Popup, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

export default class Map extends React.Component {
  constructor() {
    super()
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
    this.getPopupValue = this.getPopupValue.bind(this)
    this.clearPopupValue = this.clearPopupValue.bind(this)
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
  // getImage(value) { // to be deleted if not displaying imamges on popup hover
  //   const obj = { 'searchString': value }
  //   axios.post('/api/proxy/imageSearch/', obj)
  //     .then(res => this.setState({ popupImage: res.data.hits[Math.floor(Math.random() * res.data.hits.length)].webformatURL }))
  //     .catch(err => console.log('errors', err))
  // }
  getPopupValue(e) {
    // console.log('popup id', e.target.id)
    this.setState({ cityOnPopup: e.target.id }, this.props.handleChange(e) )
  }
  clearPopupValue() {
    this.setState({ cityOnPopup: null })
  }

  render() {
    const { data, lat, lng, bounds } = this.props //lat, lng, bounds for markers only
    console.log(data)
    return (
      <div>
        <div className="flex-row centered with-shadow">
          <ReactMapGL
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/outdoors-v10"
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}
            renderChildrenInPortal={true}
          >
            {/* <Marker   // MID, SW, NE markers for development purposes only
              latitude={lat}
              longitude={lng}
            >
              <div className="marker">MID</div>
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
                captureClick={true}
              >
                <div
                  title="destination"
                  id={point.cityCodeTo}
                  className="popup small-text without-margin"
                  onMouseEnter={this.getPopupValue}
                  onMouseLeave={this.clearPopupValue}
                  onClick={this.props.searchFromMap}
                >
                  {this.state.cityOnPopup === point.cityCodeTo ? `Find Flights to ${point.cityTo}` : `${point.cityTo}, ${point.price}${Object.keys(point.conversion)[0]}`}                   
                </div>
              </Popup>))}
          </ReactMapGL>
        </div>
      </div>
    )
  }
}