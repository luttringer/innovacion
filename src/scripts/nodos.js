/**
 * NODOS INSTITUCIONALES UTU
 * =========================
 * Visualización de nodos en el mapa de Uruguay.
 * Las coordenadas son relativas al SVG (0-100% de ancho y alto del viewBox).
 */

const NODOS_INSTITUCIONALES = [
    {
        id: 'ce-pedrofigari',
        nombre: 'Centro Educativo Dr. Pedro Figari',
        direccion: 'Bernabé Rivera Nro 257 esq. Garzón',
        departamento: 'Rivera',
        tipo: 'Tecnológica',
        x: 42,
        y: 13
    },
    {
        id: 'pet-rivera',
        nombre: 'PET Rivera',
        direccion: 'Ruta 5 Km 496.500',
        departamento: 'Rivera',
        tipo: 'Tecnológica',
        x: 52,
        y: 24
    },
    {
        id: 'pet-tacuarembo',
        nombre: 'PET Tacuarembó',
        direccion: 'Sarandí s/n esq. Michelson (Barrio Montevideo)',
        departamento: 'Tacuarembó',
        tipo: 'Tecnológica',
        x: 48,
        y: 35
    },
    {
        id: 'pet-paysandu',
        nombre: 'PET Paysandú',
        direccion: 'Calle 17 Saladero Santa María casi Av. de las Américas',
        departamento: 'Paysandú',
        tipo: 'Tecnológica',
        x: 23,
        y: 44
    },
    {
        id: 'pet-fraybentos',
        nombre: 'PET Fray Bentos',
        direccion: 'José Batlle y Ordóñez esq. San Salvador',
        departamento: 'Río Negro',
        tipo: 'Tecnológica',
        x: 21,
        y: 59
    },
    {
        id: 'ce-pedroblanesviale',
        nombre: 'Escuela Técnica Pedro Blanes Viale',
        direccion: 'Eduardo Victor Haedo Nro 458 esq. Manuel Ferrería',
        departamento: 'Soriano',
        tipo: 'Tecnológica',
        x: 24,
        y: 62
    },
    {
        id: 'ce-durazno',
        nombre: 'PET Durazno',
        direccion: 'Agustín Ferreiro s/n esq. 4 de Octubre',
        departamento: 'Durazno',
        tipo: 'Tecnológica',
        x: 41,
        y: 63
    },
    {
        id: 'ce-agrariatrinidad',
        nombre: 'Escuela Agraria Trinidad',
        direccion: 'Ruta 57 km 55.500',
        departamento: 'Flores',
        tipo: 'Educativa',
        x: 36,
        y: 67
    },
    {
        id: 'ce-florida',
        nombre: 'Escuela Técnica Florida',
        direccion: 'Gral. Flores Nro 541 esq. Batlle y Ordoñez',
        departamento: 'Florida',
        tipo: 'Tecnológica',
        x: 45,
        y: 76
    },
    {
        id: 'pet-sanjose',
        nombre: 'PET San José',
        direccion: 'Soriano Nro 042 esq. Massini',
        departamento: 'San José',
        tipo: 'Tecnológica',
        x: 39,
        y: 79
    },
    {
        id: 'ce-santalucia',
        nombre: 'Escuela Técnica Santa Lucía',
        direccion: 'Pecoche 228 entre Elena Lenzuen y Felipe de la Cueva',
        departamento: 'Canelones',
        tipo: 'Tecnológica',
        x: 43,
        y: 84
    },
    {
        id: 'pet-laspiedras',
        nombre: 'PET Las Piedras',
        direccion: 'Colonia esq. Libres',
        departamento: 'Canelones',
        tipo: 'Tecnológica',
        x: 44,
        y: 86.5
    },
    {
        id: 'pet-cerro',
        nombre: 'PET Cerro',
        direccion: 'Haití 1590',
        departamento: 'Montevideo',
        tipo: 'Tecnológica',
        x: 43,
        y: 89
    },
    {
        id: 'pet-montevideo',
        nombre: 'PET Montevideo',
        direccion: 'Carlos Sabat Ercasty entre Sebastopol y calle 6 - Vista Linda',
        departamento: 'Montevideo',
        tipo: 'Tecnológica',
        x: 45,
        y: 88
    },
    {
        id: 'pet-latumontevideo',
        nombre: 'PET Latu Montevideo',
        direccion: 'Av. Italia Nro 6201 Entre Bologna y Córcega',
        departamento: 'Montevideo',
        tipo: 'Tecnológica',
        x: 46,
        y: 89
    },
    {
        id: 'ce-montes',
        nombre: 'Escuela Agraria Montes',
        direccion: 'Av. Rufino Cavana s/n Barrio Rausa',
        departamento: 'Canelones',
        tipo: 'Educativa',
        x: 52,
        y: 85
    },
    {
        id: 'ce-minas',
        nombre: 'Escuela Técnica Minas',
        direccion: 'José P. Varela Nº 850 esq. Joaquín Suárez',
        departamento: 'Lavalleja',
        tipo: 'Tecnológica',
        x: 58,
        y: 79
    },
    {
        id: 'pet-arrayanes',
        nombre: 'PET Arrayanes',
        direccion: 'Cno. Los Arrayanes Km 7 y Ruta Interbalnearia Km 102',
        departamento: 'Canelones',
        tipo: 'Tecnológica',
        x: 58,
        y: 88
    },
    {
        id: 'pet-colonia',
        nombre: 'PET Colonia',
        direccion: 'Andrés Rabufat 1880 esq. Domingo Maggalena',
        departamento: 'Colonia',
        tipo: 'Tecnológica',
        x: 25,
        y: 82
    },
    {
        id: 'ce-juanlacaze',
        nombre: 'Escuela Técnica Juan Lacaze',
        direccion: 'José Salvo s/n esq. Don Bosco',
        departamento: 'Colonia',
        tipo: 'Educativa',
        x: 29,
        y: 81
    },
    {
        id: 'pet-salto',
        nombre: 'PET Salto',
        direccion: 'Misiones Nro 199 esq. Gral. Fructuoso Rivera',
        departamento: 'Salto',
        tipo: 'Tecnológica',
        x: 25,
        y: 28
    },
    {
        id: 'pet-melo',
        nombre: 'PET Melo',
        direccion: 'Calle Miguel Barreiro s/n esq M. Blanes',
        departamento: 'Cerro Largo',
        tipo: 'Tecnológica',
        x: 70,
        y: 46
    },
    {
        id: 'ifd-treintaytres',
        nombre: 'IFD Treinta y Tres',
        direccion: 'Valentín Olivera Nro 1612 esq. Aparicio Saravia',
        departamento: 'Treinta y Tres',
        tipo: 'Educativa',
        x: 65,
        y: 61
    },
    {
        id: 'pet-chuy',
        nombre: 'PET Chuy',
        direccion: 'Calle Pública Nº 3 esq. Ipiranga, Padrón Nº 3322',
        departamento: 'Rocha',
        tipo: 'Tecnológica',
        x: 76.5,
        y: 70
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const mapWrap = document.getElementById('mapWrap');
    if (!mapWrap) return;

    const svg = mapWrap.querySelector('svg');
    if (!svg) return;

    const nodosList = document.getElementById('nodos-list');
    const infoPanel = document.getElementById('nodo-info-panel');

    // Contenedor para los marcadores
    const nodosContainer = document.createElement('div');
    nodosContainer.id = 'nodos-container';
    nodosContainer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    mapWrap.style.position = 'relative';
    mapWrap.appendChild(nodosContainer);

    // Tooltip flotante (hover)
    const nodoTooltip = document.createElement('div');
    nodoTooltip.id = 'nodoTooltip';
    nodoTooltip.innerHTML = '<div class="nodo-name"></div><div class="nodo-address"></div>';
    document.body.appendChild(nodoTooltip);

    function calcularPosicionNodo(nodo)
    {
        const svgRect = svg.getBoundingClientRect();
        return {
            left: (nodo.x / 100) * svgRect.width,
            top: (nodo.y / 100) * svgRect.height
        };
    }

    function generarListaNodos()
    {
        nodosList.innerHTML = '';
        NODOS_INSTITUCIONALES.forEach(nodo =>
        {
            const listItem = document.createElement('div');
            listItem.className = 'nodo-list-item p-3 rounded-lg border border-gray-100 hover:border-[#862373] hover:bg-[#862373]/5 transition-all cursor-pointer';
            listItem.dataset.nodoList = nodo.id;
            listItem.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="w-3 h-3 rounded-full bg-[#862373] mt-1 flex-shrink-0 animate-pulse"></div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-gray-800 text-xs uppercase tracking-wide">${nodo.nombre}</h4>
                        <p class="text-gray-500 text-[11px] mt-1 leading-relaxed">${nodo.direccion}</p>
                    </div>
                </div>
            `;
            listItem.addEventListener('click', () =>
            {
                const marker = document.querySelector(`[data-nodo-id="${nodo.id}"]`);
                if (marker)
                {
                    document.querySelectorAll('.nodo-marker.active').forEach(m => m.classList.remove('active'));
                    document.querySelectorAll('.nodo-list-item.highlight').forEach(i => i.classList.remove('highlight'));
                    marker.classList.add('active');
                    listItem.classList.add('highlight');
                    marker.dispatchEvent(new Event('mouseenter'));
                    setTimeout(() =>
                    {
                        marker.classList.remove('active');
                        listItem.classList.remove('highlight');
                        marker.dispatchEvent(new Event('mouseleave'));
                    }, 2000);
                }
            });
            nodosList.appendChild(listItem);
        });
    }

    function mostrarPanelInfo(nodo)
    {
        document.getElementById('nodo-panel-nombre').textContent = nodo.nombre;
        document.getElementById('nodo-panel-dir').textContent = nodo.direccion;
        document.getElementById('nodo-panel-dept').textContent = nodo.departamento || '';
        document.getElementById('nodo-panel-tipo').textContent = nodo.tipo || 'Nodo';

        const mapsQuery = encodeURIComponent(nodo.nombre + ', ' + nodo.direccion + ', Uruguay');
        document.getElementById('nodo-panel-maps').href = 'https://maps.google.com/maps/search/' + mapsQuery;

        infoPanel.classList.add('panel-open');

        // En mobile: scroll suave al panel
        if (window.innerWidth < 1024)
        {
            setTimeout(() => infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        }
    }

    function crearNodosMapa()
    {
        nodosContainer.innerHTML = '';
        NODOS_INSTITUCIONALES.forEach(nodo =>
        {
            const marker = document.createElement('div');
            marker.className = 'nodo-marker';
            marker.dataset.nodoId = nodo.id;
            marker.style.pointerEvents = 'auto';

            const pos = calcularPosicionNodo(nodo);
            marker.style.left = pos.left + 'px';
            marker.style.top = pos.top + 'px';

            marker.addEventListener('mouseenter', (e) =>
            {
                marker.classList.add('active');
                nodoTooltip.querySelector('.nodo-name').textContent = nodo.nombre;
                nodoTooltip.querySelector('.nodo-address').textContent = nodo.direccion;
                nodoTooltip.classList.add('visible');
                updateTooltipPosition(e);
            });

            marker.addEventListener('mousemove', updateTooltipPosition);

            marker.addEventListener('mouseleave', () =>
            {
                // Solo quitar active si no está seleccionado como panel abierto
                if (!marker.dataset.selected) marker.classList.remove('active');
                nodoTooltip.classList.remove('visible');
            });

            marker.addEventListener('click', () =>
            {
                // Limpiar selección anterior
                document.querySelectorAll('.nodo-marker').forEach(m =>
                {
                    m.classList.remove('active');
                    delete m.dataset.selected;
                });
                marker.classList.add('active');
                marker.dataset.selected = '1';
                nodoTooltip.classList.remove('visible');

                if (infoPanel)
                {
                    mostrarPanelInfo(nodo);
                }
                else if (nodosList)
                {
                    const listItem = document.querySelector(`[data-nodo-list="${nodo.id}"]`);
                    if (listItem)
                    {
                        listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        listItem.classList.add('highlight');
                        setTimeout(() => listItem.classList.remove('highlight'), 2000);
                    }
                }
            });

            nodosContainer.appendChild(marker);
        });
    }

    function updateTooltipPosition(e)
    {
        nodoTooltip.style.left = e.clientX + 'px';
        nodoTooltip.style.top = e.clientY + 'px';
    }

    // Cerrar panel
    const closePanelBtn = document.getElementById('nodo-panel-close');
    if (closePanelBtn)
    {
        closePanelBtn.addEventListener('click', () =>
        {
            infoPanel.classList.remove('panel-open');
            document.querySelectorAll('.nodo-marker').forEach(m =>
            {
                m.classList.remove('active');
                delete m.dataset.selected;
            });
        });
    }

    let resizeTimeout;
    window.addEventListener('resize', () =>
    {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(crearNodosMapa, 200);
    });

    if (nodosList) generarListaNodos();
    crearNodosMapa();

    window.actualizarNodosMapa = () =>
    {
        if (nodosList) generarListaNodos();
        crearNodosMapa();
    };
});
