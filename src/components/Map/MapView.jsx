import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair, Maximize2, Layers, List } from 'lucide-react';
import { CATEGORIAS } from '../../data/categories';
import './Map.css';

// Ícones SVG embutidos para os marcadores customizados
function getMarkerSvgIcon(icone) {
  switch (icone) {
    case 'recycle':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.2a1.8 1.8 0 0 0 1.558-.898 1.788 1.788 0 0 0-.008-1.777L16.8 9.5"/><path d="M14.5 4.5 12 2l-2.5 2.5"/><path d="M12 2v9"/></svg>`;
    case 'cpu':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`;
    case 'truck':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;
    case 'droplet':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
    case 'leaf':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function createMarkerIcon(point, isSelected) {
  const config = CATEGORIAS[point.categoria] || CATEGORIAS.reciclavel;
  const cor = config.cor;
  const svg = getMarkerSvgIcon(point.icone);

  const activeClass = isSelected ? 'active' : '';
  const pulseRing = isSelected ? `<div class="marker-pulse-ring" style="border: 2px solid ${cor};"></div>` : '';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      ${pulseRing}
      <div class="marker-pin ${activeClass}" style="background-color: ${cor};">
        <div class="marker-inner-icon">
          ${svg}
        </div>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -36]
  });
}

export function MapView({
  filteredPoints,
  selectedPoint,
  onSelectPoint,
  onOpenMobileSheet,
  onShowToast
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const markerMapRef = useRef(new Map());
  const userMarkerRef = useRef(null);

  const [activeLayer, setActiveLayer] = useState('osm');
  const baseLayersRef = useRef({});

  // 1. Inicialização do Mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const DF_CENTER = [-15.7942, -47.8822];
    const map = L.map(mapContainerRef.current, {
      center: DF_CENTER,
      zoom: 11,
      minZoom: 9,
      maxZoom: 19,
      zoomControl: true
    });

    // Camada 1: OpenStreetMap Clássico (O visual original e preferido do OSM)
    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> colaboradores',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }
    );

    // Fallback transparente: se o servidor voluntário der 403 no localhost, carrega do espelho oficial OSM France (mesmo design!)
    osmLayer.on('tileerror', (error) => {
      if (error.tile && !error.tile.dataset.fallbackTried) {
        error.tile.dataset.fallbackTried = 'true';
        error.tile.src = error.tile.src.replace(
          /https:\/\/[abc]\.tile\.openstreetmap\.org/,
          'https://a.tile.openstreetmap.fr/osmfr'
        );
      }
    });

    baseLayersRef.current.osm = osmLayer.addTo(map);

    // Camada 2: Esri World Imagery (Satélite HD de alta resolução)
    baseLayersRef.current.satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS',
        maxZoom: 19
      }
    );

    // Camada 3: OpenStreetMap Humanitarian (HOT - estilo ecológico/humanitário)
    baseLayersRef.current.hot = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://www.hotosm.org/" target="_blank">HOT</a>',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }
    );

    const markersGroup = L.featureGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Atualização dos Marcadores quando filteredPoints ou selectedPoint mudam
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();
    markerMapRef.current.clear();

    filteredPoints.forEach(ponto => {
      const isSelected = selectedPoint && selectedPoint.id === ponto.id;
      const icon = createMarkerIcon(ponto, isSelected);

      const marker = L.marker([ponto.lat, ponto.lng], {
        icon,
        title: ponto.nome
      });

      marker.on('click', () => {
        onSelectPoint(ponto.id, true);
      });

      marker.addTo(markersGroup);
      markerMapRef.current.set(ponto.id, marker);
    });
  }, [filteredPoints, selectedPoint, onSelectPoint]);

  // 3. Centralização quando um ponto é selecionado
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPoint) return;

    map.flyTo([selectedPoint.lat, selectedPoint.lng], 15, {
      duration: 0.9,
      easeLinearity: 0.25
    });
  }, [selectedPoint]);

  // Ações dos Controles Flutuantes
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      onShowToast('Geolocalização não é suportada pelo seu navegador.', 'error');
      return;
    }

    onShowToast('Identificando sua localização no DF...', 'info');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const map = mapInstanceRef.current;
        if (!map) return;

        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }

        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `<div style="width: 22px; height: 22px; background: #0284c7; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 6px rgba(14, 165, 233, 0.4);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        userMarkerRef.current = L.marker([userLat, userLng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>Você está aqui!</b><br>Buscando pontos de coleta...')
          .openPopup();

        map.flyTo([userLat, userLng], 14, { duration: 1.2 });
        onShowToast('Localização encontrada com sucesso!', 'success');
      },
      () => {
        const map = mapInstanceRef.current;
        if (map) map.flyTo([-15.7942, -47.8822], 13);
        onShowToast('Não foi possível obter sua posição. Exibindo Brasília central.', 'info');
      },
      { timeout: 8000 }
    );
  };

  const handleResetZoom = () => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (map && markersGroup && markersGroup.getLayers().length > 0) {
      map.fitBounds(markersGroup.getBounds(), { padding: [50, 50] });
      onShowToast('Visualização redefinida para os pontos do DF.', 'info');
    }
  };

  const handleToggleLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeLayer === 'osm') {
      map.removeLayer(baseLayersRef.current.osm);
      baseLayersRef.current.satellite.addTo(map);
      setActiveLayer('satellite');
      onShowToast('Visualização de Satélite HD ativada.', 'info');
    } else if (activeLayer === 'satellite') {
      map.removeLayer(baseLayersRef.current.satellite);
      baseLayersRef.current.hot.addTo(map);
      setActiveLayer('hot');
      onShowToast('Visualização Ecológica/Humanitária ativada.', 'info');
    } else {
      map.removeLayer(baseLayersRef.current.hot);
      baseLayersRef.current.osm.addTo(map);
      setActiveLayer('osm');
      onShowToast('Mapa clássico do OpenStreetMap ativado.', 'info');
    }
  };

  return (
    <div className="map-container" id="mapContainer">
      <div ref={mapContainerRef} className="leaflet-map" role="region" aria-label="Mapa Interativo do DF" />

      {/* Controles Flutuantes do Mapa */}
      <div className="map-floating-controls">
        <button 
          type="button" 
          className="floating-btn" 
          onClick={handleGeolocation}
          title="Minha Localização no DF"
          aria-label="Localizar Minha Posição"
        >
          <Crosshair size={20} />
        </button>
        <button 
          type="button" 
          className="floating-btn" 
          onClick={handleResetZoom}
          title="Enquadrar Todos os Pontos do DF"
          aria-label="Enquadrar Pontos"
        >
          <Maximize2 size={20} />
        </button>
        <button 
          type="button" 
          className="floating-btn" 
          onClick={handleToggleLayer}
          title="Alternar Visualização do Mapa"
          aria-label="Alternar Estilo do Mapa"
        >
          <Layers size={20} />
        </button>
      </div>

      {/* Botão de Lista para Mobile */}
      <button 
        type="button" 
        className="mobile-sheet-toggle"
        onClick={onOpenMobileSheet}
        aria-label="Ver Lista de Pontos"
      >
        <List size={18} />
        <span>Ver Lista ({filteredPoints.length})</span>
      </button>
    </div>
  );
}
