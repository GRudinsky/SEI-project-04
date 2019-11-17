import React from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// const popup = () => {
  
// }
const Map = ({ data, mapDropDown, flightOnMap }) => {

  
  return (
    <div className="flex-row centered with-shadow">
      <div>
        <MapGL
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          height={'50vh'}
          width={'50vw'}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          zoom={0}
          latitude={51.515}
          longitude={-0.078}
        >
          { data && data.route.map(point => (
            <Marker
              key={point.id}
              latitude={point.latFrom}
              longitude={point.lngFrom}
            >
              <div id={point.id} onMouseEnter={mapDropDown}><img src="https://image.flaticon.com/icons/png/16/61/61212.png"/>
              </div>
            </Marker>
          ))}
          {/* { data && 
            <Popup
              latitude={data.route[0].latFrom}
              longitude={data.route[0].lngFrom}
              closeButton={true}
              closeOnClick={true}
              onClose={() => this.setState({ showPopup: false })}
              anchor="top" >
              <div>You are here</div>
            </Popup>} */}
        </MapGL>
      </div>
      <div>
        {flightOnMap && data.route.filter(flight =>(flight.id === flightOnMap)).map(pin => (
          <div key={pin.id}>
            <p>{pin.cityTo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Map