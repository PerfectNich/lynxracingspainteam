# Revisión del 7 de septiembre de 2026

Alcance: código de `repo-clean`, dependencias instaladas, workflows de GitHub Actions,
cabeceras públicas HTTPS y comprobaciones del visor multimedia en producción local.
No es una prueba de penetración ni una garantía de ausencia de vulnerabilidades.

## Cambios aplicados

- CSP: bloqueo explícito de objetos incrustados (`object-src 'none'`). Retirada de
  `frame-ancestors` del meta HTML porque el navegador no la aplica en ese formato.
- Política de referencia explícita `strict-origin-when-cross-origin`.
- El trabajo de compilación ya no recibe permisos de publicación de Pages ni OIDC.
  Solo el trabajo de despliegue recibe esos permisos. Checkout no conserva credenciales
  en los trabajos de compilación y validación.
- Dependabot configurado para proponer actualizaciones semanales de npm y Actions;
  se activará cuando estos cambios estén en la rama predeterminada.
- Reproductores Twitch con carga diferida y reproducción automática desactivada.
- Conservado el visor multimedia de la versión remota, que ya dispone de diálogo
  modal nativo, foco inicial/restauración, Escape, manejo de rechazo de reproducción,
  botones móviles y corrección de gestos desde la coordenada cero.
- Fondo de puntos respeta la preferencia de movimiento reducido. Preconexiones
  para las fuentes ya utilizadas por la web.

## Pendiente en el alojamiento

La consulta HTTPS pública devolvió `200 OK` y `Server: GitHub.com`. No incluía
`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`,
`X-Content-Type-Options` ni `Permissions-Policy` como cabeceras HTTP.
La CSP del HTML sí ofrece protección, salvo las directivas que requieren cabecera.

Configurar en un proxy o alojamiento que admita cabeceras personalizadas:

```http
Content-Security-Policy: frame-ancestors 'self'
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000
```

Si ya existe una CSP HTTP, añadir `frame-ancestors` a ella en lugar de sobrescribirla.
La CSP del meta continúa aplicándose junto a la cabecera. No añadir `includeSubDomains`
ni `preload` a HSTS sin revisar antes todos los subdominios y el mantenimiento de HTTPS.
Un archivo `_headers` por sí solo no configura estas cabeceras en GitHub Pages.
No se ha modificado DNS ni la configuración del alojamiento.

## Integración con la versión publicada

Antes de publicar se sincronizó con `origin/main` (8d5ff67). La copia inicialmente
revisada era anterior: se conservaron los perfiles de pilotos, los tests de resultados,
la página 404 y las mejoras de navegación y accesibilidad de esa versión. La automatización
Twitch ya había sido eliminada; las correcciones del script antiguo no se incorporan
ni se restaura la automatización. Le Mans se actualiza con la alineación de Jesús
presente en la versión remota: Angel Alvarado, Francisco Sierra, Jesus Jimenez y Luis Ungo.

## Otras mejoras recomendadas

- Fijar Actions a SHA completos verificados y mantenerlos con Dependabot. Actualmente
  usan etiquetas de versión mayor, que pueden cambiar de contenido.
- Auditar el peso del vídeo de portada y las imágenes con métricas en un móvil real
  antes de decidir compresión o sustitución de recursos.

## Validación

- `npm audit --json`: 0 vulnerabilidades conocidas, incluidas dependencias de desarrollo.
- `npm run lint` y `npm run build`: correctos.
- Navegador local: apertura del visor, siguiente imagen mediante flecha, cierre con
  Escape, restauración del foco al botón original y ausencia de errores de consola
  en esa prueba.
- Los cambios de workflow se validan al publicar en GitHub; no se han utilizado
  secretos de Twitch.

Referencias:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- https://docs.github.com/en/actions/reference/security/secure-use
- https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow
