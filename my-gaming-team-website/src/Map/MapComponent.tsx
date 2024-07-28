import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

//Come back to fix this error at home after work 
const MapComponent: React.FC = () => {
    const position: LatLngExpression = [-26.107220,28.096382]  

    return (
   <MapContainer center={position} zoom={13}  style={{height: "300px", width: "100%"}}>
       <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
          <Marker position={position}>
              <Popup>Our Location</Popup>
          </Marker>
      </MapContainer>
    )
}


export default MapComponent