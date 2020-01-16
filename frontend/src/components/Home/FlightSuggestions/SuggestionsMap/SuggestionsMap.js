import React from 'react'
import ReactMapGL, { Popup, FlyToInterpolator } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './SuggestionsMap.scss'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: props.width,
        height: props.height,
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
      height: this.props.height,
      width: this.props.width,
      latitude: this.props.lat, 
      zoom: this.props.zoom,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator()
    }
    this.setState({ viewport }, console.log(this.state.viewport))
  }
  componentDidMount() {
    this.scrollToMap()
    this.flyToBoundaries()
  }
  componentDidUpdate(prevProps) {
    if (this.props.lng !== prevProps.lng) {
      this.flyToBoundaries()
    }
  }
  getPopupValue(e) {
    // console.log('popup id', e.target.id)
    this.setState({ cityOnPopup: e.target.id }, this.props.handleChange(e) )
  }
  clearPopupValue() {
    this.setState({ cityOnPopup: null })
  }
  scrollToMap() {
    const scrollHeight = this.map.scrollHeight
    const height = this.map.clientHeight
    // console.log(height, scrollHeight, window.pageYOffset)
    window.scrollTo(scrollHeight, height)
  }

  render() {
    const { cityOnPopup } = this.state
    const { getPopupValue, clearPopupValue } = this
    const { data, searchFromMap } = this.props //lat, lng, bounds for markers only
    // console.log(this.state)
    return (
      <div>
        <div className="map flex-row centered with-shadow"
          ref={div => this.map = div}
        >
          <ReactMapGL
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/outdoors-v10"
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}
            renderChildrenInPortal={true}
          >
            {/* <Marker   // MID, SW, NE markers for development purposes only. Import {Marker} from 'react-map-gl' to use
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
                sortByDepth={true}
                captureClick={true}
              >
                <div
                  title="destination"
                  id={point.cityCodeTo}
                  className="popup small-text without-margin"
                  onMouseEnter={getPopupValue}
                  onMouseLeave={clearPopupValue}
                  onClick={searchFromMap}
                >
                  {cityOnPopup === point.cityCodeTo ? `Find Flights to ${point.cityTo}` : `${point.cityTo}, ${point.price}${Object.keys(point.conversion)[0]}`}                   
                </div>
              </Popup>))}
          </ReactMapGL>
        </div>
      </div>
    )
  }
}