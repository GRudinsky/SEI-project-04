
import React from 'react'
import ReactMapGL from 'react-map-gl'
import { Marker, Popup } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'

import 'mapbox-gl/dist/mapbox-gl.css'


class Map extends React.Component {
  constructor({ ...props }) {
    super({ props })
    this.state = {
      viewport: {
        width: 800,
        height: 400,
        latitude: props.lat,
        longitude: props.lng,
        zoom: props.zoom,
        bearing: 0,
        pitch: 0
      }
    }
    // this.fitToBounds = this.fitToBounds.bind(this)
  }

  fitToBounds() {
    const { longitude, latitude, zoom } = new WebMercatorViewport(this.state.viewport).fitBounds(this.props.bounds)
    // .fitBounds(this.props.bounds, { padding: { top: 82, bottom: 30, left: leftPadding, right: 30 } })
    console.log(longitude, latitude, zoom)
    // return this.setState({ ...viewport,longitude, latitude, zoom })
    const viewport = { ...this.state.viewport }
    viewport.longitude = longitude
    viewport.latitude = latitude
    viewport.zoom = zoom
    this.setState({ ...viewport })
  }
  // componentDidMount() {
  //   this.fitToBounds()
  // }

  render() {
    const { data, lat, lng, bounds } = this.props
    console.log(this.state)
    return (
      <div className="flex-row centered with-shadow">
        <ReactMapGL
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          <Marker
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
          </Marker>
          {data && data.map(point => (
            <Popup
              key={point.id}
              latitude={point.route[0].latTo}
              longitude={point.route[0].lngTo}
              closeButton={false}
              // closeOnClick={true}
              anchor="top" >
              <div className="small-text">{point.cityTo}, {point.price}{Object.keys(point.conversion)[0]}</div>
            </Popup>))}
        </ReactMapGL>
      </div>
    )
  }
}
export default Map