# Changelog

## 2026-04-13

- Añadido `RM Motor` al carrusel de sponsors con enlace a `https://www.instagram.com/rmmotor_/`.
- Actualizado `PadDesign3D` para que el logo del carrusel enlace a `https://www.instagram.com/paddesign3d`.
- Corregido el encabezado de `MediaPage` para que use traducciones y no deje textos fijos en castellano.
- Añadido un bloque destacado para `RM Motor` como patrocinador principal.
- Configurado el bloque de `Calendario del equipo` para mostrar el próximo evento desde Google Calendar, incluyendo fecha y hora.
- Recortadas las imágenes iniciales de galería `iracing-lynx-01.png` e `iracing-lynx-02.png`.
- Actualizado `vite` en local a una versión segura y compatible (`7.3.2`) para corregir la vulnerabilidad detectada en el entorno de desarrollo.
- Regenerado `package-lock.json` y ajustado el workflow de despliegue para evitar fallos de `npm ci` en GitHub Actions.
- Convertido el paso final de `build` a una copia portable de `404.html`, sin depender de `cp`.
