import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import type { NominatimResult, RutaGeometria } from "../interfaces/NominatimResult";


export const MapaFondo = ({ origen, destino, ruta }: { origen: NominatimResult | null, destino: NominatimResult | null, ruta: RutaGeometria | null }) => {
  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapContainer center={[10.9685, -74.7813]} zoom={13} scrollWheelZoom={true} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {origen && !isNaN(parseFloat(origen.lat)) && (
            <Marker position={[parseFloat(origen.lat), parseFloat(origen.lon)]} />
          )}
          {destino && !isNaN(parseFloat(destino.lat)) && (
            <Marker position={[parseFloat(destino.lat), parseFloat(destino.lon)]} />
          )}
          <Polyline
            positions={ruta?.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]) || []}
            color="blue"
            weight={5}
          />
        </MapContainer>
      </div>
    </>
  )
}
