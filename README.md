# tw-postcss-base — Tailwind + PostCSS

Plantilla mínima para micrositios y frontends ligeros. 
Enfocada en **desarrollo rápido**, **build simple** y **pocas dependencias**.

## Stack
- Tailwind CSS 3.4.x
- PostCSS + `postcss-nested` + `autoprefixer` + `cssnano` (prod)
- Terser para minificar JS

## Estructura
├─ src/
│ ├─ styles.css
│ ├─ images
│ └─ scripts/
│   └─ app.js
├─ dist/
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ .gitignore

## Instalación
npm init -y
npm i -D tailwindcss@^3.4.0 postcss postcss-cli autoprefixer postcss-nested cssnano terser
npx tailwindcss init -p

## Uso como plantilla
git clone https://github.com/luttringer/tw-postcss-base.git nombreCarpetaDestino
cd nombreCarpetaDestino
rmdir /s /q .git
npm ci
git init
git add .
git commit -m "feat: bootstrap project"
git branch -M main
git remote add origin https://github.com/luttringer/x.git
git push -u origin main
