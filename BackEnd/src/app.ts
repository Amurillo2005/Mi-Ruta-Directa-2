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

app.get("/api/search", async (req: Request, res: Response) => {

    const { q } = req.query;

    if (!q || typeof q !== "string") {
        res.status(400).json({ error: "El parámetro de búsqueda es requerido" });
        return; 
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q as string)}&format=json&addressdetails=1&limit=5`, {
            headers:{
                "User-Agent": `Mi Ruta Directa 2 ${process.env.EMAIL}`
            }
        })

        if (!response.ok) {
            res.status(response.status).json({ error: "Error en el servicio de mapas" });
            return;
        }

        const data = await response.json();
        console.log(data);
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Error al buscar la dirección"})
    }
    
})

export default app;