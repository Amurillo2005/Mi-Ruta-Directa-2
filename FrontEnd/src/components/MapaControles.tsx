import { useMap } from "react-leaflet"
import { useEffect } from "react";
import type { NominatimResult } from "../interfaces/NominatimResult";

export const EnfocarRuta = ({origen, destino}: { origen: NominatimResult | null, destino: NominatimResult | null}) => {
  const map = useMap();

  useEffect(() => {
    if (!origen || !destino) return
    
    const bounds: [number, number][] = [
      [parseFloat(origen.lat), parseFloat(origen.lon)],
      [parseFloat(destino.lat), parseFloat(destino.lon)]
    ]


    map.fitBounds(bounds, { padding: [50, 50] })

  }, [origen, destino, map])

  return null

}
