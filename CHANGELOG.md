# Changelog

## 2026-06-02

- Reforzada la home con un bloque de métricas rápidas para dar más credibilidad al equipo de un vistazo.
- Ajustada `ShopPage` para que la tienda funcione como catálogo realista y los pedidos lleven a Instagram o Discord en lugar de simular una compra cerrada.
- Mejorada `ResultsPage` con destacados rápidos, más contexto visual y un CTA directo hacia `Palmarés`.
- Movidos a traducciones varios textos fijos de `Agenda`, `Resultados`, `Contacto` y `Palmarés`.
- Eliminados componentes antiguos sin uso de la carpeta `src/components/shop` para evitar duplicidades.

## 2026-04-13

- Añadido `RM Motor` al carrusel de sponsors con enlace a `https://www.instagram.com/rmmotor_/`.
- Actualizado `PadDesign3D` para que el logo del carrusel enlace a `https://www.instagram.com/paddesign3d`.
- Corregido el encabezado de `MediaPage` para que use traducciones y no deje textos fijos en castellano.
- Añadido un bloque destacado para `RM Motor` como patrocinador principal.
- Configurado el bloque de `Calendario del equipo` para mostrar el próximo evento desde Google Calendar, incluyendo fecha y hora.
- Añadido un listado nativo de próximos eventos para `Agenda`, agrupado en columnas de `ACC` e `iRacing`.
- Recortadas las imágenes iniciales de galería `iracing-lynx-01.png` e `iracing-lynx-02.png`.
- Actualizado `vite` en local a una versión segura y compatible (`7.3.2`) para corregir la vulnerabilidad detectada en el entorno de desarrollo.
- Regenerado `package-lock.json` y ajustado el workflow de despliegue para evitar fallos de `npm ci` en GitHub Actions.
- Convertido el paso final de `build` a una copia portable de `404.html`, sin depender de `cp`.
- Añadido SEO por página con `title`, `description`, Open Graph, Twitter y canonical dinámicos según ruta e idioma.
- Ajustada la home para simplificar secciones, recuperar una navegación más limpia y mantener `Agenda` visible en el header.

## 2026-04-17

- Añadido soporte SEO adicional para idiomas con `hreflang`, `x-default`, `og:locale` y `og:locale:alternate`.
- Ajustadas las rutas alternas del SEO para que `es`, `en` y `ca` apunten correctamente a su versión equivalente de cada página.

## 2026-04-20

- Corregida la página de `Agenda` para ocultar eventos pasados y evitar que las carreras caducadas aparezcan marcadas como `Hoy`.
- Resincronizados `next-race.json` y `upcoming-events.json` con la siguiente tanda real de carreras desde Google Calendar.
- Añadida una política `Content-Security-Policy` base en la entrada principal para endurecer la carga de recursos y embeds de terceros.
- Restringido mejor el iframe de Twitch con `sandbox` y `referrerPolicy`.
- Separadas las páginas secundarias con carga diferida por rutas para reducir el peso del bundle inicial.
