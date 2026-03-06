export interface NominatimResult {
    display_name: string;
    lat: string;
    lon: string;
}

export interface RutaGeometria {
    type: string;
    coordinates: [number, number][];
}

export interface RutaDatos {
    origen: NominatimResult;
    destino: NominatimResult;
    ruta: RutaGeometria;
}