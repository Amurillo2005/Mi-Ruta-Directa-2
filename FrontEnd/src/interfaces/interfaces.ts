import type { Dispatch, SubmitEvent, SetStateAction } from "react";

export interface NominatimResult {
    nombre: string;
    lat: number;
    lon: number;
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

export interface FormularioProps {
    handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
    direccionOrigen: string;
    setDireccionOrigen: Dispatch<SetStateAction<string>>;
    direccionDestino: string;
    setDireccionDestino: Dispatch<SetStateAction<string>>;
    ciudad: string;
    setCiudad: Dispatch<SetStateAction<string>>;
}