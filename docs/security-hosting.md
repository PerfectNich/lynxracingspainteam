# Cabeceras de producción

GitHub Pages no permite definir estas cabeceras desde el repositorio. La CSP del HTML sigue activa, pero `frame-ancestors` debe enviarse por HTTP.

Para aplicarlas conservando Pages, el dominio debe pasar por un proxy con reglas de cabeceras (por ejemplo Cloudflare). No se han modificado DNS ni cuentas externas.

Configurar en las respuestas del dominio:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Para CSP, copiar la política vigente de `index.html` a `Content-Security-Policy` y añadir `frame-ancestors 'none'`. Probar primero como `Content-Security-Policy-Report-Only` y comprobar Inicio, Twitch, Multimedia y fuentes antes de activar. No añadir políticas distintas entre HTML y HTTP sin revisar su intersección.

HSTS: activar `Strict-Transport-Security: max-age=31536000` solo tras confirmar HTTPS y las redirecciones del dominio. No usar `includeSubDomains` ni preload sin inventariar todos los subdominios.

Comprobar con `curl -I https://lynxracingspainteam.com/` y en las herramientas del navegador. Un archivo `_headers` no surte efecto en GitHub Pages.
