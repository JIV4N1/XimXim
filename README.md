# Buenas noches, Ximena

Página estática de Pompompurin, con ilustraciones SVG/CSS dibujadas en código, lluvia de personajes al tocar, mensaje sorpresa y modo nocturno. No necesita instalación ni compilación.

## Configurar tu canción

1. Sube tu MP3 a `assets/audio/mi-cancion.mp3` (o el nombre que prefieras).
2. Edita `music-config.js`:

```js
window.MUSIC_CONFIG = Object.freeze({
  src: 'assets/audio/mi-cancion.mp3',
  title: 'El título de tu canción',
  volume: 0.7,
  loop: true
});
```

3. Guarda los cambios en GitHub y vuelve a desplegar, o espera el despliegue automático de tu servidor.

Deja `src: ''` para desactivar la música. Usa rutas relativas sin `/` inicial para que funcione también en subdirectorios. El archivo debe existir y respetar exactamente mayúsculas y minúsculas.

Los visitantes pueden escuchar, pausar, avanzar y ajustar el volumen. No hay formulario de subida ni endpoint de escritura: cambiar la canción publicada requiere acceso de escritura a tu repositorio o servidor. Conserva esos permisos solo para ti. La configuración y el audio son recursos públicos al desplegar; no contienen contraseñas ni secretos.

Los navegadores suelen bloquear el audio antes de una interacción: la música comienza con el primer toque/clic o tecla, o con el botón de reproducción. Una pausa manual se respeta y no se revierte al tocar la página. Todavía no se incluye ningún audio.

## Deploy

Publica el contenido de la raíz de este repositorio como archivos estáticos. El documento de entrada es `index.html`.

- **Servidor propio:** copia `index.html`, `style.css`, `app.js`, `music-config.js` y la carpeta `assets/` al directorio público.
- **Hosting conectado a GitHub:** selecciona `main`, sin comando de build, y directorio de publicación `.`.
- **GitHub Pages:** en Settings → Pages, selecciona Deploy from a branch, rama `main`, carpeta `/ (root)`.

Vista previa local opcional: `python -m http.server 8000`, luego abre `http://localhost:8000`.

Las fuentes se cargan desde Google Fonts, con fuentes locales de respaldo. Las ilustraciones no dependen de imágenes externas.
