# PortAxl — Portafolio web reorganizado

Esta versión mantiene la idea visual y las interacciones del proyecto original, pero cambia la estructura para que sea mucho más fácil de editar.

## 1. Estructura

```text
PortAxl/
├── index.html                  ← INICIO: estructura general del portafolio
│
├── proyectos/
│   ├── index.html              ← índice de categorías
│   ├── motion-design.html      ← solo Motion Design
│   ├── branding.html           ← solo Branding
│   ├── editorial.html          ← solo Editorial
│   └── web-design.html         ← solo Web Design
│
├── casos/
│   ├── terra-cafe.html         ← caso de estudio Terra Café
│   └── app-fondo.html          ← caso de estudio App Fondo
│
├── css/
│   ├── base.css                ← reglas generales, colores, tipografías, nav y footer
│   ├── home.css                ← estilos de las secciones del inicio
│   ├── pages.css               ← estilos de las páginas internas
│   └── animations.css          ← animaciones reutilizables
│
├── js/
│   ├── effects.js              ← fade-in, parallax, habilidades y barra de scroll
│   ├── gallery.js              ← galería horizontal tipo cilindro
│   └── contact.js              ← animación del botón de contacto
│
└── assets/
    ├── img/
    ├── icons/
    └── video/
```

## 2. ¿Qué cambió respecto al proyecto original?

Antes, `index.html` contenía prácticamente todo: la página, los paneles de categorías, los datos de proyectos y los casos de estudio. JavaScript creaba parte del contenido dinámicamente.

Ahora el flujo es más sencillo:

**index.html → categoría → página HTML de esa categoría**

Por ejemplo:

```text
index.html
   ↓ clic en Branding
proyectos/branding.html
```

Y para casos:

```text
index.html
   ↓ clic en Ver caso
casos/terra-cafe.html
```

No hay overlays para estas páginas. Son documentos HTML reales.

## 3. ¿Dónde modifico cada cosa?

### Cambiar texto del inicio
Edita:

`index.html`

Ahí están:
- Hero
- Sobre mí
- Primeras tarjetas de proyectos
- Casos de estudio
- Habilidades
- Contacto
- Footer

### Agregar o cambiar proyectos de una categoría
Abre directamente el HTML correspondiente.

Ejemplo:

`proyectos/branding.html`

Busca:

```html
<article class="project-item">
```

Cada bloque `article` representa un proyecto.

Para agregar otro, copia uno de esos bloques y cambia:
- número
- título
- descripción
- categoría

### Cambiar una categoría completa
Edita:

`proyectos/motion-design.html`

`proyectos/branding.html`

`proyectos/editorial.html`

`proyectos/web-design.html`

### Cambiar un caso de estudio
Edita:

`casos/terra-cafe.html`

o

`casos/app-fondo.html`

Ahí puedes agregar más etapas, imágenes, textos, resultados, etc.

## 4. CSS explicado de forma sencilla

No necesitas buscar una regla dentro de un archivo de 600+ líneas.

### `css/base.css`
Es la base de todo el sitio.

Aquí encontrarás:
- colores
- tipografías
- tamaños generales
- navegación
- botones
- footer
- elementos generales

La paleta principal está arriba:

```css
:root{
  --crema:#F5F1E8;
  --negro:#181712;
  --verde:#034C3B;
  --gris:#D9D9D6;
}
```

Si cambias `--verde`, por ejemplo, cambiará el verde usado por gran parte del sitio.

### `css/home.css`
Solo necesitas este archivo cuando quieras modificar el diseño del inicio:

```text
Hero
↓
Sobre mí
↓
Proyectos
↓
Casos de estudio
↓
Habilidades
↓
Contacto
```

### `css/pages.css`
Controla las páginas internas de proyectos y casos.

### `css/animations.css`
Aquí puedes colocar o modificar animaciones CSS que quieras reutilizar.

## 5. JavaScript explicado

### `js/effects.js`

Aquí están los efectos generales:
- aparición progresiva al hacer scroll
- movimiento/parallax del hero
- movimiento de las habilidades
- indicador lateral de scroll

### `js/gallery.js`

Este es el archivo importante para el efecto de cilindro.

No necesitas modificarlo para cambiar los nombres de las categorías.

Las tarjetas principales están directamente en:

`index.html`

Por ejemplo:

```html
<a class="g-card" data-cat="Branding" href="proyectos/branding.html">
```

Lo importante es el `href`.

Ese `href` dice:

> cuando haga clic en esta tarjeta, abre esta página.

### `js/contact.js`

Controla la animación:

```text
Enviar
 ↓
cargando
 ↓
check
 ↓
Mensaje enviado
```

Actualmente sigue siendo una simulación visual. Todavía no envía un correo real.

## 6. ¿Cómo agregar imágenes?

Las imágenes deben ir dentro de:

`assets/img/`

Ejemplo:

```text
assets/img/branding-terra.jpg
```

Después puedes colocarla en el HTML o CSS correspondiente.

Para una tarjeta de proyecto puedes utilizar:

```css
.project-thumb{
  background-image:url("../assets/img/branding-terra.jpg");
  background-size:cover;
  background-position:center;
}
```

## 7. Cómo abrirlo

En Visual Studio Code:

1. Abre la carpeta `PortAxl`.
2. Instala **Live Server** si todavía no lo tienes.
3. Haz clic derecho en `index.html`.
4. Selecciona **Open with Live Server**.

También puedes abrir `index.html` directamente en el navegador.

## 8. Regla sencilla para no perderte

Piensa en el proyecto así:

**HTML = contenido y estructura**

**CSS = apariencia**

**JavaScript = comportamiento y efectos**

Y dentro de HTML:

**index.html = portada**

**proyectos/*.html = proyectos**

**casos/*.html = casos de estudio**

Así puedes modificar una parte sin tener que entender todo el proyecto.
