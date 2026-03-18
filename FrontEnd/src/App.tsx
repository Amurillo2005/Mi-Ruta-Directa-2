import { useState } from "react"
import { MapaFondo } from "./components/MapaFondo";
import type { RutaDatos } from "./interfaces/interfaces";
import { Formulario } from "./components/Formulario";

function App() {
  
  const [direccionOrigen, setDireccionOrigen] = useState<string>("");
  const [direccionDestino, setDireccionDestino] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [datosRutas, setDatosRutas] = useState<RutaDatos | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!direccionOrigen || !direccionDestino || !ciudad) {
      alert("Información incompleta");
      return;
    }

    try {

       const params = new URLSearchParams({
         origen: direccionOrigen,
         destino: direccionDestino,
         ciudad: ciudad
       })

       const res = await fetch(`http://localhost:3000/api/search?${params}`);
       const datos: RutaDatos = await res.json();

       setDatosRutas(datos);
       
    } catch (error) {
       alert("Error al buscar la dirección")
       console.log(error)
    }

    setDireccionOrigen("");
    setDireccionDestino("");
    setCiudad("");

  }

  return (
    <>
      <MapaFondo origen={datosRutas?.origen ?? null} destino={datosRutas?.destino ?? null} ruta={datosRutas?.ruta ?? null}/>
      <Formulario handleSubmit={handleSubmit} direccionOrigen={direccionOrigen} setDireccionOrigen={setDireccionOrigen} direccionDestino={direccionDestino} setDireccionDestino={setDireccionDestino} ciudad={ciudad} setCiudad={setCiudad} />
    </>
  )
}

export default App
