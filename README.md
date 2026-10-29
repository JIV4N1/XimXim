# Buenas noches, Ximena

Página estática de Pompompurin, con ilustraciones SVG/CSS dibujadas en código, lluvia de personajes al tocar, mensaje sorpresa y modo nocturno. No necesita instalación ni compilación.

## Configurar tu canción

1. Sube tu MP3 a `assets/audio/mi-cancion.mp3` (o el nombre que prefieras).
2. Edita `music-config.js`:

```js
window.MUSIC_CONFIG = Object.freeze({
  src: 'assets/audio/mi-cancion.mp3',
  title: 'El título de tu canción',
  volume: 0.35,
  loop: true
});
```

3. Guarda los cambios en GitHub y vuelve a desplegar, o espera el despliegue automático de tu servidor.

Deja `src: ''` para desactivar la música. Usa rutas relativas sin `/` inicial para que funcione también en subdirectorios. El archivo debe existir y respetar exactamente mayúsculas y minúsculas.

La canción suena en segundo plano, en bucle y sin reproductor ni controles visibles. El volumen configurado es 35 % (algunos dispositivos pueden imponer su propio volumen multimedia).

No hay formulario de subida ni endpoint de escritura: cambiar la canción publicada requiere acceso de escritura a tu repositorio o servidor. Conserva esos permisos solo para ti. La configuración y el audio son recursos públicos al desplegar; no contienen contraseñas ni secretos.

Se intenta reproducir al entrar. Si el navegador bloquea el audio automático con sonido, se reintenta con el primer toque, clic o tecla. Una web no puede garantizar sonido antes de esa interacción en todos los navegadores.

## Deploy

Publica el contenido de la raíz de este repositorio como archivos estáticos. El documento de entrada es `index.html`.

- **Servidor propio:** copia `index.html`, `style.css`, `app.js`, `music-config.js` y la carpeta `assets/` al directorio público.
- **Hosting conectado a GitHub:** selecciona `main`, sin comando de build, y directorio de publicación `.`.
- **GitHub Pages:** en Settings → Pages, selecciona Deploy from a branch, rama `main`, carpeta `/ (root)`.

Vista previa local opcional: `python -m http.server 8000`, luego abre `http://localhost:8000`.

Las fuentes se cargan desde Google Fonts, con fuentes locales de respaldo. Las ilustraciones no dependen de imágenes externas.
