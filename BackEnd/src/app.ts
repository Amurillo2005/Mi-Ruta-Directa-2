import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import type { Request, Response } from "express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

app.get("/api/search", async (req: Request, res: Response): Promise<void> => {

    const { origen, destino, ciudad } = req.query;

    if (!origen || !destino || !ciudad) {
        res.status(400).json({ error: "Todos los parámetros son requeridos" });
        return;
    }

    try {
        const resOrigen = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${origen}, ${ciudad}`)}&format=json&addressdetails=1&limit=1`, {
            headers: {
                "User-Agent": `Mi Ruta Directa 2 ${process.env.EMAIL}`
            }
        })
        const dataOrigen = await resOrigen.json()

        const resDestino = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${destino}, ${ciudad}`)}&format=json&addressdetails=1&limit=1`, {
            headers: {
                "User-Agent": `Mi Ruta Directa 2 ${process.env.EMAIL}`
            }
        })
        const dataDestino = await resDestino.json()

        if (dataOrigen.length === 0 || dataDestino.length === 0) {
            res.status(404).json({ error: "Dirección no encontrada" });
            return;
        }

        const puntoOrigen = dataOrigen[0];
        const puntoDestino = dataDestino[0];

        console.log("Punto Origen:", puntoOrigen);
        console.log("Punto Destino:", puntoDestino);

        const osrmRuta = await fetch(`https://router.project-osrm.org/route/v1/driving/${puntoOrigen.lon},${puntoOrigen.lat};${puntoDestino.lon},${puntoDestino.lat}?overview=full&geometries=geojson`);
        const osrmData = await osrmRuta.json();

        if (!osrmData.routes || osrmData.routes.length === 0) {
            res.status(404).json({ error: "No se encontró ruta entre estos puntos" });
            return;
        }

        res.json({
            origen: { nombre: puntoOrigen.display_name, coords: [puntoOrigen.lat, puntoOrigen.lon] },
            destino: { nombre: puntoDestino.display_name, coords: [puntoDestino.lat, puntoDestino.lon] },
            ruta: osrmData.routes[0].geometry
        })
    } catch (error) {
        res.status(500).json({ error: "Error al buscar la dirección" })
    }

})

export default app;