# UITT — Unidad de Innovación y Transferencia Tecnológica (UTU Uruguay)

## Qué es este proyecto

Sitio web institucional estático para la UITT de UTU (Uruguay). Presenta la red de innovación educativa: mapa interactivo de nodos, sección explicativa de la unidad, KPIs y noticias. No tiene backend ni base de datos.

## Stack

| Capa | Tecnología |
|---|---|
| Markup | HTML5 (3 páginas independientes) |
| Estilos | Tailwind CSS 3.4 + PostCSS (postcss-nested, autoprefixer, cssnano) |
| Scripts | Vanilla JavaScript ES6+ (sin frameworks) |
| Build | PostCSS CLI + Terser |
| Fuentes | Google Fonts: Montserrat · Material Symbols (iconos) |

**Sin frameworks**: sin React, Vue, Astro, WordPress ni nada similar.

## Estructura del proyecto

```
UITT/
├── src/
│   ├── styles.css          ← entrada CSS (Tailwind + custom)
│   ├── scripts/            ← 9 módulos JS
│   └── images/             ← banneres, logos, íconos, referencias de diseño
├── dist/                   ← compilados (generados, no editar a mano)
│   ├── styles.css / styles.min.css
│   └── scripts.min.js
├── index.html              ← home
├── mapa.html               ← mapa interactivo standalone
├── procesoInnovacion.html  ← áreas de innovación, CATI, emprendedurismo
└── mapa/                   ← submódulo con build propio del mapa
```

## Scripts de build

```bash
npm run watch:css    # desarrollo: observa cambios → dist/styles.css
npm run build:css    # producción: CSS minificado → dist/styles.min.css
npm run min:js       # minifica todos los .js en src/scripts/
npm run build        # build:css + min:js
```

Los archivos fuente están en `src/`, los compilados en `dist/`. **Nunca editar los archivos en `dist/` a mano.**

> Nota: en Windows, `npm run build:css` falla por el prefijo `NODE_ENV=production`.
> Alternativa funcional: `$env:NODE_ENV="production"; npx postcss src/styles.css -o dist/styles.min.css`
> Para dev (sin minificar): `npx postcss src/styles.css -o dist/styles.css`

## Módulos JavaScript

| Archivo | Qué hace |
|---|---|
| `menuScroll.js` | Header sticky que se compacta al scrollear; toggle menú mobile |
| `nodos.js` | Genera marcadores SVG dinámicos; 24 nodos con coordenadas; tooltips |
| `particlesMenu.js` | Canvas particles en el header |
| `particlesCifras.js` | Canvas particles en sección KPIs |
| `scrollEfect.js` | Reveal animations por scroll (IntersectionObserver) |
| `galeria.js` | Galería de imágenes |
| `cifrasHome.js` | Contador animado de KPIs |
| `plusUTU.js` | Typewriter rotador de texto en header (`+innovación`, `+comunidad`, `+UTU`) |
| `rotacionObjetivos.js` | Rotación de contenido/objetivos |

## Paleta de colores (tailwind.config.js)

```
primary:       #1997f0   (azul UITT)
brand:         #9D2236   (rojo UTU)
accent:        #F8E71D   (amarillo)
bg-light:      #f8fafc
bg-dark:       #0f172a
```

Colores ANEP institucionales también definidos (cyan, yellow, blue, etc.).

## Páginas y contenido

- **index.html**: hero → sección UITT (actores + proceso) → mapa → noticias → KPIs
- **procesoInnovacion.html**: áreas de innovación, capacitación, propiedad intelectual (CATI), emprendedurismo
- **mapa.html**: mapa standalone con lista lateral de los 24 nodos

### Orden de secciones en index.html

1. Header sticky (nav + typewriter)
2. Hero simplificado (h1: "Unidad de Innovación")
3. `#servycap` — sección UITT: actores interactivos + 7 pasos
4. Mapa SVG de Uruguay interactivo (`#mapaGrid`)
5. Banner parallax con KPIs
6. Noticias
7. Cifras / métricas
8. CTA de cierre
9. Footer

## Sección UITT (`#servycap`)

Sección principal explicativa de la unidad. Reemplazó el antiguo "Proceso de Innovación".

### Tres actores interactivos (tabs con JS inline)
- **UTU** — El conocimiento: genera proyectos, soluciones e investigaciones (docentes y estudiantes)
- **Nodos** (activo por defecto) — El intermediario territorial: 24 espacios en todo Uruguay, sala colaborativa + auditorio de 130 butacas, banco de problemas geolocalizados
- **País** — Las necesidades reales: sector productivo, industrial y sociedad civil

Clicking cada botón muestra su panel de contenido. El JS está inline al final de la sección.

### 7 pasos del proceso de innovación
1. Identificación del problema
2. Categorización y jerarquización → **CATI** (Centro de Apoyo a la Tecnología e Innovación, OMPI)
3. Orientación de proyectos
4. Validación y prototipado
5. Formulación del proyecto
6. Capital semilla e innovación empresarial → **CIU** (Cámara de Industrias del Uruguay)
7. Incubación y constitución → **INACOOP** + **MIDES**

### Clases CSS de la sección (en `src/styles.css`)
- `.uitt-actor-selector`, `.uitt-actor-btn`, `.uitt-actor-btn--active`, `.uitt-actor-arrow`
- `.uitt-actor-panels`, `.uitt-actor-panel`
- `.uitt-panel-inner`, `.uitt-panel-text`, `.uitt-panel-stats`, `.uitt-panel-stats--icons`
- `.uitt-panel-eyebrow`, `.uitt-panel-title`, `.uitt-panel-desc`
- `.uitt-panel-stat`, `.uitt-panel-stat--icon`, `.uitt-panel-stat__num`, `.uitt-panel-stat__label`
- `.uitt-steps`, `.uitt-step`, `.uitt-step--last` (span 2 col en md+)
- `.uitt-step__num`, `.uitt-step__num--final`, `.uitt-step__body`, `.uitt-step__title`, `.uitt-step__desc`, `.uitt-step__partner`

## Mapa interactivo

SVG de Uruguay con 19 departamentos coloreados por región. Los 24 nodos de innovación se generan dinámicamente desde el array en `src/scripts/nodos.js` con coordenadas x/y relativas al SVG. Incluye tooltips con info del centro.

## Contexto de dominio — qué es la UITT

La UITT articula tres actores:
- **UTU**: músculo académico, genera proyectos/soluciones/investigaciones (~5.000 proyectos anuales de fin de curso)
- **Nodos**: intermediarios territoriales (24 en todo Uruguay), banco de problemas, sala colaborativa en red, auditorio de 130 butacas. 4 tipologías: Tecnológica, Educativa, Social, Empresarial
- **País**: sector productivo, industrial y social; presenta necesidades reales

Socios institucionales en el proceso: CATI (OMPI), CIU, INACOOP, MIDES.
Rumbo a certificación ISO 56001 (gestión de la innovación).

## Convenciones del proyecto

- Mobile first, breakpoints Tailwind estándar (sm/md/lg/xl/2xl)
- Animaciones vía CSS keyframes + Canvas API (no librerías externas)
- Google Fonts cargadas desde CDN en cada HTML
- Sin jQuery, sin lodash, sin frameworks UI
- Clases CSS custom siguen convención BEM: `.bloque__elemento--modificador`
- JS interactivo específico de sección se embebe inline al final de esa sección

## Carpetas a ignorar

`node_modules/`, `dist/`, `.git/`, `*.min.js`, `*.min.css`

## Deploy

Sitio completamente estático. Compatible con Netlify, GitHub Pages, Apache/Nginx o cualquier hosting. No requiere servidor de aplicaciones.
