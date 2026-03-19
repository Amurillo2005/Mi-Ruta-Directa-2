# Mi Ruta Directa 2

Este es el mismo proyecto de Mi Ruta Directa para cálculo de rutas pero mejorado.

## Mejoras implementadas

- En Mi Ruta Directa, el ingreso de las direcciones, la búsqueda de las direcciones en la base de datos de OpenStreetMap para obtener las latitudes y longitudes y el cálculo de rutas se hacía en el FrontEnd. En cambio, en Mi Ruta Directa 2, el FrontEnd solo hace el ingreso de las direcciones por parte del usuario y en el backend se hace la búsqueda de estas direcciones en la base de datos de OpenStreetMap y también el cálculo de las rutas.
- Se creó un Popup para mostrar el nombre del origen y otro Popup para mostrar el nombre del destino.
- El formulario se puso en un archivo aparte para dejar el App.tsx lo más limpio posible.

## Tecnologías utilizadas

- React + TypeScript.
- NodeJS + TypeScript.
- Tailwind para estilos.
- Leaflet y React Leaflet para mostrar el mapa.
- Nominatin para búsqueda de las direcciones ingresadas en la base de datos de OpenStreetMap y obtener las latitudes y longitudes.
- OSRM (Open Source Routing Machine) para el cálculo de las rutas ya teniendo latitud y longitud.
- Lucide React para los iconos usados en los inputs.

## Instalación y uso

- Clonar el repositorio con el comando git clone https:githubcomAmurillo2005Mi-Ruta-Directa-2.git
- Ir a la ruta del proyecto con cd Mi-Ruta-Directa-2
- Una vez en el proyecto, abre una terminal, escribe cd Frontend, ejecuta npm install para instalar las dependecias y escribe el comando npm run dev para iniciar el frontend. Después, abre otra terminal, escribe cd Backend, ejecuta el comando npm install para instalar las dependencias y escribe el comando npm run dev para iniciar el backend.
- Por último, en el backend crea un archivo .env y escribe: PORT=3000 y también EMAIL=tu_email@ejemplo.com

## Razón por la que hice este proyecto dos veces

Este proyecto lo hice de nuevo porque quería ver la diferencia entre Photon y Nominatin en la búsqueda de direcciones a pesar de que ambos son OpenStreetMap.

## Diferencias entre Photon y Nominatin

- En mi Ruta Directa, Photon permite hacerle peticiones desde un frontend pero en cambio, Nominatin no permite hacer peticiones desde un frontend porque me daba un error de CORS así que me vi obliagado a crear un backend para usar Nominatim.
- Cuando Photon devuelve las latitudes y longitudes de las direcciones ingresadas por el usuario lo hace así: {"coordinates": [2.938833, 74.929383]}. En cambio, Nominatim, lo hace así: {"lat": "41.3874", "lon": "2.1686",}, por esta razón, en el backend se tienen que convertir la latitud y longitud a números debido a que react-leaflet no acepta strings para mostrar las ubicaciones en el mapa.

## Notas

El proyecto tiene ciertos errores como:

- Muchas veces no encuentra las direcciones ingresadas.
- Algunas direcciones no las pone exactas como el usuario las ingresó sino que las pone cerca.
- La dirección de destino la pone en otra ciudad distinta a la que el usuario ingresó.

A pesar de estos errores, me siento satisfecho con el proyecto.