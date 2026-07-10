# Changelog

## 2026-06-28

- Automatizado el aviso flotante de Twitch en `Inicio` con sincronización periódica desde GitHub Actions.
- Mejorado el badge de Twitch para priorizar el canal principal y reflejar cuando hay varios pilotos en directo a la vez.
- Actualizada `Agenda` para las 24H de Spa con dos equipos confirmados, coches asignados y alineaciones separadas por entrada.
- Simplificada `Agenda` para mostrar únicamente las próximas carreras de iRacing.
- Reorganizados los eventos con una próxima cita destacada y campeonatos agrupados en una parrilla más compacta.
- Centrado el contenido de las tarjetas de `Tienda` para unificar la alineación de nombres, precios y acciones.
- Corregido el canal de Twitch de Rubén Gómez a `chibitowo`.
- Añadido un vídeo promocional optimizado de fondo en la portada, manteniendo el escudo y la animación original como respaldo.
- Actualizadas dependencias vulnerables y optimizada la portada para ahorro de datos, movimiento reducido y menor consumo gráfico.
- Reducido el peso de Multimedia con carga diferida, vídeos sin precarga y conversión de la captura LMU a WebP.
- Sustituida la agenda general de iRacing por un calendario editorial del equipo centrado en las `24H de Spa`.
- Añadida la alineación GT3 prevista para Spa y retirado el flujo automático que publicaba carreras genéricas.
- Integrado Cloudflare Web Analytics para medir visitas y rendimiento sin seguimiento individual.
- Optimizada la galería completa: imágenes convertidas a WebP y vídeos Meihan/Rally recodificados para web.
- Añadidos `sitemap.xml`, `robots.txt` y datos estructurados del equipo para mejorar indexación y SEO.
- Añadidas validaciones automáticas de JSON, activos, eventos y sitemap tanto en build como en pull requests.

## 2026-06-19

- Automatizada la sincronización de `Agenda` con Google Calendar mediante GitHub Actions cada hora y ejecución manual.
- Actualizados `next-race.json` y `upcoming-events.json` con los nuevos eventos detectados desde el calendario compartido del bot.
- Documentado el flujo real de sincronización: bot iRacing -> Google Calendar -> web.

## 2026-06-03

- Mejorado `Roster` con un hero más contextual, métricas rápidas y una separación más clara entre dirección, pilotos y directos.
- Rehecho `Palmarés` con resumen superior, destacados rápidos e histórico más ordenado por simulador y temporada.
- Añadida una franja de captación en `Inicio` para unirse al equipo o colaborar con Lynx.
- Reforzada `Contacto` con un bloque específico para entrar al equipo o contactar con el proyecto.

## 2026-06-02

- Reforzada la home con un bloque de métricas rápidas para dar más credibilidad al equipo de un vistazo.
- Ajustada `ShopPage` para que la tienda funcione como catálogo realista y los pedidos lleven a Instagram o Discord en lugar de simular una compra cerrada.
- Eliminada la página de `Resultados` y redirigida la ruta antigua hacia `Palmarés` para unificar esa parte de la web.
- Movidos a traducciones varios textos fijos de `Agenda`, `Contacto` y `Palmarés`.
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
