# Revisión de seguridad y mantenimiento — 5 de octubre de 2026

Alcance: revisión estática del repositorio, comprobación de contenido, análisis de dependencias y workflows de GitHub Actions. No es una prueba de penetración ni una garantía de ausencia de vulnerabilidades.

## Estado y medidas del repositorio

- La política CSP del HTML bloquea plugins (`object-src 'none'`), limita scripts y conexiones a los servicios necesarios, y la política de referencia es `strict-origin-when-cross-origin`.
- Los jobs de validación/compilación usan permisos mínimos y checkout sin persistencia de credenciales; solo el job de despliegue recibe `pages: write` y `id-token: write`.
- Las GitHub Actions externas están fijadas a SHA completos verificados, con la versión legible en comentario, y Dependabot queda encargado de proponer actualizaciones.
- Dependabot está configurado para revisar npm y GitHub Actions semanalmente.
- `npm audit` no detectó vulnerabilidades conocidas en la última revisión local.
- Se vació el evento antiguo de la Agenda; el componente muestra un mensaje sin carrera programada y conserva la página y sus enlaces.
- Se actualizaron las fechas `lastmod` del sitemap al 5 de octubre de 2026.

## Cabeceras pendientes del alojamiento

GitHub Pages no permite establecer cabeceras HTTP arbitrarias desde el repositorio. Un archivo `_headers` no configura estas cabeceras en GitHub Pages. La respuesta HTTPS observada en la revisión anterior no incluía CSP HTTP, HSTS, `X-Frame-Options`, `X-Content-Type-Options` ni `Permissions-Policy`. La CSP del HTML sí se aplica, salvo directivas que solo funcionan como cabeceras (por ejemplo `frame-ancestors`).

Para activar las cabeceras restantes haría falta un proxy o alojamiento que las admita. Configuración sugerida, tras verificarla en dicho alojamiento:

```http
Content-Security-Policy: frame-ancestors 'self'
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000
```

Si ya existe una CSP HTTP, añadir `frame-ancestors` a ella en lugar de sustituirla. No añadir `includeSubDomains` ni `preload` a HSTS sin revisar todos los subdominios. No se modificó DNS ni el proveedor de alojamiento.

## Datos del roster

Los nombres, dorsales, fotos y canales de Twitch se publican deliberadamente para mostrar el roster. Al estar en archivos estáticos también son visibles para quien clone el repositorio. Si en el futuro se quieren mantener visibles en la web y ocultos del repositorio público, hará falta servirlos desde una fuente privada en tiempo de ejecución; un `.env` incluido en un frontend estático no los mantendría secretos.

## Validación

- `npm run lint`: correcto.
- `npm test`: 6 pruebas correctas.
- `npx tsc -b --pretty false`: correcto.
- `npm run build`: correcto; generó los recursos de producción y la página 404.
- `npm audit --json`: 0 vulnerabilidades conocidas (281 dependencias analizadas).
- `node scripts/check-content.mjs`: 7 archivos JSON, 69 activos y 24 rutas SEO validados.

Referencias:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- https://docs.github.com/en/actions/reference/security/secure-use
- https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow
- https://github.com/actions/checkout/releases/tag/v7.0.1
- https://github.com/actions/setup-node/releases/tag/v6.4.0
- https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0
- https://github.com/actions/deploy-pages/releases/tag/v5.0.0
