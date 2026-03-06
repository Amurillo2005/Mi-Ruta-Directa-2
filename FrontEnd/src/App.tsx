import { useState } from "react"
import { MapPin, Navigation, Building2 } from "lucide-react";
import { MapaFondo } from "./components/MapaFondo";
import type { NominatimResult } from "./interfaces/NominatimResult";

function App() {
  
  const [direccionOrigen, setDireccionOrigen] = useState<string>("");
  const [direccionDestino, setDireccionDestino] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [datosRutas, setDatosRutas] = useState<{
    origen: NominatimResult,
    destino: NominatimResult
  } | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!direccionOrigen || !direccionDestino || !ciudad) {
      alert("Información incompleta");
      return;
    }

    try {
       const resOrigen = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(direccionOrigen)},${ciudad}`);
       const datosOrigen = await resOrigen.json()

       const resDestino = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(direccionDestino)}, ${ciudad}`);
       const datosDestino = await resDestino.json();

       console.log("Datos Origen:", datosOrigen);
       console.log("Datos Destino:", datosDestino);

       setDatosRutas({ origen: datosOrigen[0], destino: datosDestino[0] });
       
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
      <MapaFondo origen={datosRutas?.origen || null} destino={datosRutas?.destino || null}/>
      <form onSubmit={handleSubmit} className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 w-[92%] md:w-fit max-w-6xl p-3 md:p-2 bg-gray-400 rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64 lg:w-72 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <MapPin size={18} />
            </div>
            <input value={direccionOrigen} onChange={(e) => setDireccionOrigen(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Origen"/>
          </div>
          <div className="relative w-full md:w-64 lg:w-72 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Navigation size={18} className="rotate-90" />
            </div>
            <input value={direccionDestino} onChange={(e) => setDireccionDestino(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Destino"/>
          </div>
          <div className="relative w-full md:w-40 lg:w-48 text-gray-500">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Building2 size={18} />
            </div>
            <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="w-full p-3 pl-11 bg-white rounded-full placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Ciudad"/>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-white text-gray-700 rounded-full md:rounded-2xl  hover:bg-gray-600 hover:text-white transition-colors duration-500 active:scale-95 cursor-pointer" type="submit"> Buscar </button>
      </form>
    </>
  )
}

export default App
