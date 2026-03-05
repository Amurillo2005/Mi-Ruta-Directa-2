import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css";

export const MapaFondo = () => {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapContainer center={[10.9685, -74.7813]} zoom={13} scrollWheelZoom={true} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  )
}
