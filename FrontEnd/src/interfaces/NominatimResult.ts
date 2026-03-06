export interface NominatimResult {
    display_name: string;
    lat: string;
    lon: string;
}

export interface RutaDatos {
    origen: NominatimResult;
    destino: NominatimResult
}