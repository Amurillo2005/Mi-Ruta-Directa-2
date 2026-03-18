import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { memo } from "react";
import L from "leaflet";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import type { NominatimResult, RutaGeometria } from "../interfaces/interfaces";
import { EnfocarRuta } from "./MapaControles";

const origenIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: MarkerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const destinoIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: MarkerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export const MapaFondo = memo(({ origen, destino, ruta }: { origen: NominatimResult | null, destino: NominatimResult | null, ruta: RutaGeometria | null }) => {
  console.log("Datos en el mapa:", { origen, destino, ruta });

  return (
    <>
      <div className="fixed inset-0 z-0">
        <MapContainer center={[10.9685, -74.7813]} zoom={13} scrollWheelZoom={true} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <EnfocarRuta origen={origen} destino={destino}/>

          {origen && !isNaN(origen.lat) && !isNaN(origen.lon) && (
            <Marker position={[origen.lat, origen.lon]} icon={origenIcon}/>
          )}
          {destino && !isNaN(destino.lat) && !isNaN(destino.lon) && (
            <Marker position={[destino.lat, destino.lon]} icon={destinoIcon}/>
          )}
          {ruta && ruta.coordinates && (
            <Polyline
              positions={ruta.coordinates.map((coord: [number, number]) => [coord[1], coord[0]])}
              color="#3b82f6" 
              weight={6}
              opacity={0.8}
            />
          )}
        </MapContainer>
      </div>
    </>
  )
})
