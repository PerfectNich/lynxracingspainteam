# Actualizar la web

## Anadir un resultado

Ejecuta `npm run add:result` desde la carpeta del proyecto.
El asistente pregunta carrera, ano, simulador, coche, posicion y pilotos.
Puedes elegir si sustituye al resultado destacado de inicio.
No modifica ni publica el diseno: guarda los datos localmente.

Los resultados estan en `src/data/race-results.json`. Cada registro tiene
un `id` unico, `event`, `year`, `simulator`, `car`, `pos`, `drivers`
y `featured`. Para corregir un resultado existente, edita ese registro.
Los participantes historicos que ya no estan en el roster se conservan.

## Preparar la proxima carrera

Edita `src/data/team-event.json`:

- `title`: nombre de la carrera.
- `startDate` y `endDate`: fechas YYYY-MM-DD, o ambas null si faltan por confirmar.
- `status`: preparing o completed.
- `teams`: numero de equipos; debe coincidir con la cantidad de entries.
- `entries`: un registro por equipo, con name, category, car, result y drivers.
- `car` y `result` de cada equipo admiten null cuando faltan por confirmar.
- Usa los nombres de `src/data/members.json` para los pilotos.

Al terminar, registra el resultado con el asistente antes de sustituir la
carrera de la agenda. Asi permanecera en el historial y las fichas.

## Comprobar y publicar

Ejecuta `npm run check:content` y `npm run build`.
Los cambios son locales hasta crear el commit y subirlo a main.
Inicio, agenda, palmares y fichas reutilizan estos mismos datos.
