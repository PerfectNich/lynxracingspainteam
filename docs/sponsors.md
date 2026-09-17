# Sponsors

Las fichas se editan en `src/data/sponsors.json`. La página está en `/sponsors`, `/en/sponsors` y `/ca/sponsors`.

- `description`: texto breve por idioma (`es`, `en`, `ca`). Los textos iniciales son provisionales; no atribuyen productos ni ofertas sin confirmar.
- `logo`: ruta del archivo dentro de `public`, por ejemplo `/sponsors/bolori.webp`.
- `url`: enlace HTTPS confirmado, o `null` si no existe.
- `published: false`: oculta la ficha y su logo en Inicio. Permite preparar futuros colaboradores antes de mostrarlos.
- `discount: null`: no muestra ningún bloque de oferta.

Cuando llegue una oferta confirmada, sustituir `discount` por un objeto con `description`, opcionalmente `code`, y, si corresponde, `terms` y `expiresOn` (fecha YYYY-MM-DD). Los textos de descripción y condiciones usan objetos por idioma igual que la descripción de la ficha. El código se copia al pulsar el botón; si el navegador no lo permite, se puede seleccionar manualmente. Las ofertas caducadas se ocultan según la fecha local del visitante. Esto solo controla la presentación: el sponsor debe validar las condiciones en su tienda.

Bolori está visible con su logo, descripción confirmada y descuento del 10 %. Su enlace es https://bolori.es/; el código queda pendiente. SRP también muestra un 10 % sin código por ahora.

Antes de publicar: `npm run lint` y `npm run build`. La compilación comprueba logos, enlaces y datos de ofertas publicadas.
