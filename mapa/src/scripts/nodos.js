/**
 * NODOS INSTITUCIONALES UTU
 * =========================
 * Maneja la visualización dinámica de centros educativos sobre el mapa de Uruguay.
 *
 * Características:
 *  - Coordenadas guardadas en % del viewBox original del SVG (independiente del tamaño en pantalla).
 *    El mapa se redimensiona a su contenedor y los marcadores se recalculan automáticamente
 *    porque se proyectan usando la matriz CTM real del SVG.
 *  - Cada centro tiene un "tipo" que determina el color del marcador y de la lista
 *    (Escuela Técnica, Escuela Agraria, Polo Educativo, Centro Nodo, Centro CEA).
 *  - Lista de centros debajo del mapa con buscador y leyenda.
 *  - Click sobre Montevideo o Canelones: amplía esa región (zoom de viewBox) para ver los
 *    centros (cuando se carguen) ya que ambos departamentos son chicos. Botón "Volver" para
 *    salir del zoom.
 *  - Click sobre cualquier otra parte del mapa: dispara un alert con las coordenadas
 *    (x%, y%) proporcionales al viewBox - útil para cargar nuevos centros copiando esos
 *    valores al array NODOS_INSTITUCIONALES.
 *  - Hover sobre un punto: muestra tooltip con nombre, tipo y dirección.
 *
 * MODIFICAR ESTE ARRAY para agregar / quitar centros. El resto se genera dinámicamente.
 */

/* =====================================================================
 * Tipos de Centro Educativo + paleta de colores
 * ===================================================================== */
const TIPOS_CE = {
    tecnica: { label: 'Escuela Técnica',  color: '#862373', soft: 'rgba(134, 35, 115, 0.4)' },
    agraria: { label: 'Escuela Agraria',  color: '#2e7d32', soft: 'rgba(46, 125, 50, 0.4)'  },
    polo:    { label: 'Polo Educativo',   color: '#1565c0', soft: 'rgba(21, 101, 192, 0.4)' },
    nodo:    { label: 'Centro Nodo',      color: '#ef6c00', soft: 'rgba(239, 108, 0, 0.4)'  },
    cea:     { label: 'Centro CEA',       color: '#6a1b9a', soft: 'rgba(106, 27, 154, 0.4)' }
};

/* =====================================================================
 * Centros Educativos
 *  - x, y: porcentajes (0-100) sobre el viewBox del SVG. Se obtienen
 *    haciendo click en el mapa (alert) cuando no hay marcador.
 *  - tipo: una key de TIPOS_CE.
 * Notar: por pedido del cliente, Montevideo y Canelones quedan vacíos
 * por ahora (se accede haciendo zoom a esa región).
 * ===================================================================== */
const NODOS_INSTITUCIONALES = [
    { id: 'ce-pedrofigari',      nombre: 'Centro Educativo Dr. Pedro Figari',  direccion: 'Bernabé Rivera Nro 257 esq. Garzón',                   tipo: 'nodo',    x: 42,   y: 13   },
    { id: 'pet-rivera',          nombre: 'PET Rivera',                          direccion: 'Ruta 5 Km 496.500',                                    tipo: 'polo',    x: 52,   y: 24   },
    { id: 'pet-salto',           nombre: 'PET Salto',                           direccion: 'Misiones Nro 199 esq. Gral. Fructuoso Rivera',         tipo: 'polo',    x: 25,   y: 28   },
    { id: 'pet-tacuarembo',      nombre: 'PET Tacuarembó',                      direccion: 'Sarandí s/n esq. Michelson (Barrio Montevideo)',       tipo: 'polo',    x: 48,   y: 35   },
    { id: 'pet-paysandu',        nombre: 'PET Paysandú',                        direccion: 'Calle 17 Saladero Santa María casi Av. de las Américas', tipo: 'polo',  x: 23,   y: 44   },
    { id: 'pet-melo',            nombre: 'PET Melo',                            direccion: 'Calle Miguel Barreiro s/n esq M. Blanes',              tipo: 'polo',    x: 70,   y: 46   },
    { id: 'pet-frayventos',      nombre: 'PET Fray Bentos',                     direccion: 'José Batlle y Ordoñez esq. San Salvador',              tipo: 'polo',    x: 21,   y: 59   },
    { id: 'ce-pedroblanesviale', nombre: 'Escuela Técnica Pedro Blanes Viale',  direccion: 'Eduardo Victor Haedo Nro 458 esq. Manuel Ferrería',    tipo: 'tecnica', x: 24,   y: 62   },
    { id: 'ce-durazno',          nombre: 'PET Durazno',                         direccion: 'Agustín Ferreiro s/n esq. 4 de Octubre',               tipo: 'polo',    x: 41,   y: 63   },
    { id: 'ifd-treintaytres',    nombre: 'IFD Treinta y Tres',                  direccion: 'Valentín Olivera Nro 1612 esq. Aparicio Saravia',      tipo: 'nodo',    x: 65,   y: 61   },
    { id: 'ce-agrariatrinidad',  nombre: 'Escuela Agraria Trinidad',            direccion: 'Ruta 57 km 55.500',                                    tipo: 'agraria', x: 36,   y: 67   },
    { id: 'pet-chuy',            nombre: 'PET Chuy',                            direccion: 'Calle Pública Nº 3 esq. Ipiranga, Padrón Nº 3322',     tipo: 'polo',    x: 76.5, y: 70   },
    { id: 'ce-florida',          nombre: 'Escuela Técnica Florida',             direccion: 'Gral. Flores Nro 541 esq. Batlle y Ordoñez',           tipo: 'tecnica', x: 45,   y: 76   },
    { id: 'ce-minas',            nombre: 'Escuela Técnica Minas',               direccion: 'José P. Varela Nº 850 esq. Joaquín Suárez',            tipo: 'tecnica', x: 58,   y: 79   },
    { id: 'pet-sanjose',         nombre: 'PET San José',                        direccion: 'Soriano Nro 042 esq. Massini',                         tipo: 'polo',    x: 39,   y: 79   },
    { id: 'ce-juanlacaze',       nombre: 'Escuela Técnica Juan Lacaze',         direccion: 'José Salvo s/n esq. Don Bosco',                        tipo: 'tecnica', x: 29,   y: 81   },
    { id: 'pet-colonia',         nombre: 'PET Colonia',                         direccion: 'Andrés Rabufat 1880 esq. Domingo Maggalena',           tipo: 'polo',    x: 25,   y: 82   },
];

/* =====================================================================
 * Inyección de estilos para los nuevos componentes (tipos, search, zoom).
 * Se agrega de manera dinámica para no tener que regenerar dist/styles.css.
 * ===================================================================== */
(function injectStyles() {
    const css = `
    /* Marcador con color por tipo (usa CSS vars) */
    .nodo-marker {
        background: var(--nodo-color, #862373);
        box-shadow: 0 0 0 0 var(--nodo-color-soft, rgba(134,35,115,0.7));
        animation: nodoPulse 2s infinite;
    }
    .nodo-marker.active {
        background: var(--nodo-color, #862373);
        filter: brightness(1.15);
        box-shadow: 0 0 0 8px var(--nodo-color-soft, rgba(134,35,115,0.4));
    }
    /* Override del keyframe global para que use la variable de color */
    @keyframes nodoPulse {
        0%   { box-shadow: 0 0 0 0 var(--nodo-color-soft, rgba(134,35,115,0.7)); }
        70%  { box-shadow: 0 0 0 10px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
    }

    /* Tarjeta de la lista: borde lateral con el color del tipo */
    .nodo-list-item {
        position: relative;
        padding: 10px 12px 10px 14px;
        border-radius: 10px;
        border: 1px solid #f1f1f1;
        cursor: pointer;
        transition: all .2s ease;
        background: #fff;
    }
    .nodo-list-item::before {
        content: "";
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 4px;
        border-radius: 10px 0 0 10px;
        background: var(--nodo-color, #862373);
    }
    .nodo-list-item:hover {
        border-color: var(--nodo-color, #862373);
        background: #fafafa;
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .nodo-list-item.highlight {
        background: #fff7ee;
        border-color: var(--nodo-color, #862373);
        box-shadow: 0 0 0 2px var(--nodo-color-soft, rgba(134,35,115,0.2));
    }
    .nodo-list-item .nodo-tipo-badge {
        display: inline-block;
        font-size: 9px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        color: #fff;
        background: var(--nodo-color, #862373);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
    }

    /* Leyenda */
    .legend-item { display: inline-flex; align-items: center; gap: 6px; }
    .legend-dot  { width: 10px; height: 10px; border-radius: 50%; flex: 0 0 auto; }

    /* Mapa: cursor zoom-in en MVD/CAN para sugerir la ampliación
       (mayor especificidad para ganarle a .map-wrap .area path { cursor: pointer }) */
    #geo\\.ISO-UY-MO path, #geo\\.ISO-UY-CA path,
    .map-wrap #geo\\.ISO-UY-MO path,
    .map-wrap #geo\\.ISO-UY-CA path { cursor: zoom-in !important; }

    /* Botón volver del zoom */
    .map-zoom-back {
        position: absolute;
        top: 12px; right: 12px;
        z-index: 60;
        display: none;
        gap: 6px;
        align-items: center;
        background: #fff;
        color: #862373;
        border: 1px solid #e5e7eb;
        border-radius: 999px;
        padding: 6px 12px;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }
    .map-zoom-back.visible { display: inline-flex; }
    .map-zoom-back:hover { background: #862373; color: #fff; }

    /* Tooltip con tipo */
    #nodoTooltip .nodo-tipo {
        display: inline-block;
        font-size: 10px;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 999px;
        background: rgba(255,255,255,0.25);
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    `;
    const style = document.createElement('style');
    style.id = 'nodos-injected-styles';
    style.textContent = css;
    document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {
    const mapWrap   = document.getElementById('mapWrap');
    const svg       = mapWrap && mapWrap.querySelector('svg');
    const nodosList = document.getElementById('nodos-list');
    const legendEl  = document.getElementById('nodos-legend');
    const searchEl  = document.getElementById('nodos-search');
    const emptyEl   = document.getElementById('nodos-empty');

    if (!svg || !nodosList) return;

    /* viewBox original — se guarda para volver del zoom */
    const VB_ORIGINAL = (svg.getAttribute('viewBox') || svg.getAttribute('viewbox') || '0 0 863.78137 695.90759')
        .split(/\s+/).map(Number);
    // Aseguramos que el atributo se llame viewBox (case-sensitive en SVG).
    svg.setAttribute('viewBox', VB_ORIGINAL.join(' '));

    /* Contenedor para los markers (HTML divs encima del SVG) */
    let nodosContainer = document.getElementById('nodos-container');
    if (!nodosContainer) {
        nodosContainer = document.createElement('div');
        nodosContainer.id = 'nodos-container';
        Object.assign(nodosContainer.style, {
            position: 'absolute', top: '0', left: '0',
            width: '100%', height: '100%', pointerEvents: 'none'
        });
        mapWrap.style.position = 'relative';
        mapWrap.appendChild(nodosContainer);
    }

    /* Tooltip */
    let nodoTooltip = document.getElementById('nodoTooltip');
    if (!nodoTooltip) {
        nodoTooltip = document.createElement('div');
        nodoTooltip.id = 'nodoTooltip';
        nodoTooltip.innerHTML = `
            <div class="nodo-tipo"></div>
            <div class="nodo-name"></div>
            <div class="nodo-address"></div>
        `;
        document.body.appendChild(nodoTooltip);
    }

    /* Botón "volver" para salir del zoom MVD/CAN */
    let zoomBackBtn = document.querySelector('.map-zoom-back');
    if (!zoomBackBtn) {
        zoomBackBtn = document.createElement('button');
        zoomBackBtn.type = 'button';
        zoomBackBtn.className = 'map-zoom-back';
        zoomBackBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px">arrow_back</span> Ver Uruguay`;
        mapWrap.appendChild(zoomBackBtn);
    }

    /* =====================================================================
     * Conversión SVG <-> pantalla
     *  Usamos getScreenCTM() para convertir coords del viewBox a píxeles.
     *  Esto funciona aunque cambiemos el viewBox (zoom) o el contenedor cambie de tamaño.
     * ===================================================================== */
    function svgPointToScreen(svgX, svgY) {
        const pt = svg.createSVGPoint();
        pt.x = svgX; pt.y = svgY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return { x: 0, y: 0 };
        return pt.matrixTransform(ctm);
    }

    function screenToSvgPoint(clientX, clientY) {
        const pt = svg.createSVGPoint();
        pt.x = clientX; pt.y = clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return { x: 0, y: 0 };
        return pt.matrixTransform(ctm.inverse());
    }

    /* Convierte el % del nodo a coordenadas SVG (en el viewBox ORIGINAL,
       no afectado por el zoom: las coordenadas guardadas siguen siendo
       válidas porque el viewBox sólo recorta una región del mismo plano.) */
    function nodoToSvgCoords(nodo) {
        return {
            x: (nodo.x / 100) * VB_ORIGINAL[2],
            y: (nodo.y / 100) * VB_ORIGINAL[3]
        };
    }

    /* Posición en píxeles (relativa a mapWrap) para colocar el marker */
    function calcularPosicionNodo(nodo) {
        const { x: svgX, y: svgY } = nodoToSvgCoords(nodo);
        const screen = svgPointToScreen(svgX, svgY);
        const wrapRect = mapWrap.getBoundingClientRect();
        return { left: screen.x - wrapRect.left, top: screen.y - wrapRect.top };
    }

    /* =====================================================================
     * Render de la leyenda
     * ===================================================================== */
    function generarLeyenda() {
        if (!legendEl) return;
        legendEl.innerHTML = Object.entries(TIPOS_CE).map(([key, t]) => `
            <span class="legend-item">
                <span class="legend-dot" style="background:${t.color}"></span>
                <span>${t.label}</span>
            </span>
        `).join('');
    }

    /* =====================================================================
     * Render de la lista (con filtro de búsqueda)
     * ===================================================================== */
    function generarListaNodos(filtroTexto = '') {
        nodosList.innerHTML = '';
        const q = filtroTexto.trim().toLowerCase();
        const visibles = NODOS_INSTITUCIONALES.filter(n => {
            if (!q) return true;
            return (n.nombre + ' ' + n.direccion + ' ' + (TIPOS_CE[n.tipo]?.label || '')).toLowerCase().includes(q);
        });

        if (emptyEl) emptyEl.classList.toggle('hidden', visibles.length > 0);

        visibles.forEach(nodo => {
            const tipo = TIPOS_CE[nodo.tipo] || TIPOS_CE.tecnica;
            const item = document.createElement('div');
            item.className = 'nodo-list-item';
            item.dataset.nodoList = nodo.id;
            item.style.setProperty('--nodo-color', tipo.color);
            item.style.setProperty('--nodo-color-soft', tipo.soft);

            item.innerHTML = `
                <span class="nodo-tipo-badge">${tipo.label}</span>
                <h4 class="font-bold text-gray-800 text-xs uppercase tracking-wide leading-tight">${nodo.nombre}</h4>
                <p class="text-gray-500 text-[11px] mt-1 leading-relaxed">${nodo.direccion}</p>
            `;

            item.addEventListener('click', () => focoEnNodo(nodo.id));
            nodosList.appendChild(item);
        });

        // Resaltar coincidencia también en el mapa
        if (q) {
            document.querySelectorAll('.nodo-marker').forEach(m => {
                const id = m.dataset.nodoId;
                const visible = visibles.some(v => v.id === id);
                m.style.opacity = visible ? '1' : '0.15';
            });
        } else {
            document.querySelectorAll('.nodo-marker').forEach(m => m.style.opacity = '');
        }
    }

    /* =====================================================================
     * Render de markers en el mapa
     * ===================================================================== */
    function crearNodosMapa() {
        nodosContainer.innerHTML = '';

        NODOS_INSTITUCIONALES.forEach(nodo => {
            const tipo = TIPOS_CE[nodo.tipo] || TIPOS_CE.tecnica;
            const marker = document.createElement('div');
            marker.className = 'nodo-marker';
            marker.dataset.nodoId = nodo.id;
            marker.style.pointerEvents = 'auto';
            marker.style.setProperty('--nodo-color', tipo.color);
            marker.style.setProperty('--nodo-color-soft', tipo.soft);

            const pos = calcularPosicionNodo(nodo);
            marker.style.left = pos.left + 'px';
            marker.style.top  = pos.top + 'px';

            marker.addEventListener('mouseenter', (e) => {
                marker.classList.add('active');
                nodoTooltip.querySelector('.nodo-tipo').textContent    = tipo.label;
                nodoTooltip.querySelector('.nodo-name').textContent    = nodo.nombre;
                nodoTooltip.querySelector('.nodo-address').textContent = nodo.direccion;
                nodoTooltip.style.background = tipo.color;
                nodoTooltip.classList.add('visible');
                updateTooltipPosition(e);
            });
            marker.addEventListener('mousemove', updateTooltipPosition);
            marker.addEventListener('mouseleave', () => {
                marker.classList.remove('active');
                nodoTooltip.classList.remove('visible');
            });

            // Click en marcador: scroll a la lista, NO disparar el alert ni el zoom MVD/CAN
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                focoEnNodo(nodo.id, true);
            });

            nodosContainer.appendChild(marker);
        });
    }

    function updateTooltipPosition(e) {
        nodoTooltip.style.left = e.clientX + 'px';
        nodoTooltip.style.top  = e.clientY + 'px';
    }

    /* Resalta un nodo (en mapa + lista) y hace scroll al item */
    function focoEnNodo(id, fromMap = false) {
        const marker = document.querySelector(`.nodo-marker[data-nodo-id="${id}"]`);
        const item   = document.querySelector(`.nodo-list-item[data-nodo-list="${id}"]`);

        document.querySelectorAll('.nodo-marker.active').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.nodo-list-item.highlight').forEach(i => i.classList.remove('highlight'));

        if (marker) {
            marker.classList.add('active');
            marker.dispatchEvent(new Event('mouseenter'));
            setTimeout(() => {
                marker.classList.remove('active');
                marker.dispatchEvent(new Event('mouseleave'));
            }, 2200);
        }
        if (item) {
            item.classList.add('highlight');
            if (!fromMap) item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => item.classList.remove('highlight'), 2200);
        }
    }

    /* =====================================================================
     * ZOOM a Montevideo + Canelones
     *  Animamos el viewBox del SVG hacia la bbox combinada de ambos deptos.
     * ===================================================================== */
    let zoomActivo   = false;
    let animacionVB  = null; // id del rAF activo

    function getDeptViewBox(deptIds, padding = 12) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const inverseCTM = svg.getScreenCTM().inverse();
        deptIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            [
                [rect.left,  rect.top],
                [rect.right, rect.top],
                [rect.left,  rect.bottom],
                [rect.right, rect.bottom]
            ].forEach(([cx, cy]) => {
                const pt = svg.createSVGPoint();
                pt.x = cx; pt.y = cy;
                const sp = pt.matrixTransform(inverseCTM);
                if (sp.x < minX) minX = sp.x;
                if (sp.y < minY) minY = sp.y;
                if (sp.x > maxX) maxX = sp.x;
                if (sp.y > maxY) maxY = sp.y;
            });
        });
        return [minX - padding, minY - padding, (maxX - minX) + padding * 2, (maxY - minY) + padding * 2];
    }

    function animarViewBox(target, duracion = 500) {
        if (animacionVB) cancelAnimationFrame(animacionVB);
        const start = (svg.getAttribute('viewBox') || VB_ORIGINAL.join(' ')).split(/\s+/).map(Number);
        const t0 = performance.now();
        const ease = t => t < .5 ? 2*t*t : -1+(4-2*t)*t; // easeInOutQuad

        function step(now) {
            const k = Math.min(1, (now - t0) / duracion);
            const e = ease(k);
            const vb = start.map((v, i) => v + (target[i] - v) * e);
            svg.setAttribute('viewBox', vb.join(' '));
            // re-posicionar markers durante la animación
            actualizarPosicionesMarkers();
            if (k < 1) animacionVB = requestAnimationFrame(step);
            else animacionVB = null;
        }
        animacionVB = requestAnimationFrame(step);
    }

    function actualizarPosicionesMarkers() {
        document.querySelectorAll('.nodo-marker').forEach(m => {
            const nodo = NODOS_INSTITUCIONALES.find(n => n.id === m.dataset.nodoId);
            if (!nodo) return;
            const pos = calcularPosicionNodo(nodo);
            m.style.left = pos.left + 'px';
            m.style.top  = pos.top + 'px';
        });
    }

    function zoomAMontevideoCanelones() {
        const target = getDeptViewBox(['geo.ISO-UY-MO', 'geo.ISO-UY-CA'], 15);
        animarViewBox(target, 600);
        zoomActivo = true;
        zoomBackBtn.classList.add('visible');
    }

    function volverZoomCompleto() {
        animarViewBox(VB_ORIGINAL, 600);
        zoomActivo = false;
        zoomBackBtn.classList.remove('visible');
    }

    zoomBackBtn.addEventListener('click', volverZoomCompleto);

    /* =====================================================================
     * Click en el SVG:
     *   - Si cae sobre Montevideo o Canelones → zoom.
     *   - En otro caso → alert con coordenadas (x%, y%) proporcionales,
     *     útil para cargar nuevos centros en el array.
     * ===================================================================== */
    svg.addEventListener('click', (e) => {
        // Si el click es sobre un marker, no hacemos nada (ya tiene su propio handler con stopPropagation).
        if (e.target.closest('.nodo-marker')) return;

        // Detectar si fue sobre MVD o CAN
        const dept = e.target.closest('#geo\\.ISO-UY-MO, #geo\\.ISO-UY-CA') || e.target.closest('[id]');
        const id = dept && dept.id;
        if (id === 'geo.ISO-UY-MO' || id === 'geo.ISO-UY-CA') {
            if (!zoomActivo) zoomAMontevideoCanelones();
            return;
        }

        // Click en cualquier otra zona → coordenadas proporcionales sobre el viewBox ORIGINAL
        const sp = screenToSvgPoint(e.clientX, e.clientY);
        const xPct = (sp.x / VB_ORIGINAL[2]) * 100;
        const yPct = (sp.y / VB_ORIGINAL[3]) * 100;

        const xStr = xPct.toFixed(2);
        const yStr = yPct.toFixed(2);

        // Snippet listo para copiar y pegar
        const snippet = `{ id: 'nuevo-id', nombre: 'Nuevo Centro', direccion: 'Dirección', tipo: 'tecnica', x: ${xStr}, y: ${yStr} },`;

        // Copia automática al portapapeles si está disponible
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(snippet).catch(() => {});
        }

        alert(
            `Coordenadas del punto:\n` +
            `   x: ${xStr}%\n` +
            `   y: ${yStr}%\n\n` +
            `(Snippet copiado al portapapeles, listo para pegar en NODOS_INSTITUCIONALES):\n\n` +
            snippet
        );
    });

    /* =====================================================================
     * Buscador
     * ===================================================================== */
    if (searchEl) {
        let debTimer;
        searchEl.addEventListener('input', () => {
            clearTimeout(debTimer);
            debTimer = setTimeout(() => generarListaNodos(searchEl.value), 120);
        });
    }

    /* =====================================================================
     * Resize: reposicionar markers (sin re-crearlos)
     * ===================================================================== */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(actualizarPosicionesMarkers, 60);
    });

    /* =====================================================================
     * Inicialización
     * ===================================================================== */
    generarLeyenda();
    generarListaNodos();
    crearNodosMapa();

    // Después de que se aplique el primer layout, recalcular posiciones
    requestAnimationFrame(() => requestAnimationFrame(actualizarPosicionesMarkers));

    // API pública para refrescar luego de modificar el array
    window.actualizarNodosMapa = () => {
        generarLeyenda();
        generarListaNodos(searchEl ? searchEl.value : '');
        crearNodosMapa();
        requestAnimationFrame(actualizarPosicionesMarkers);
    };
});
