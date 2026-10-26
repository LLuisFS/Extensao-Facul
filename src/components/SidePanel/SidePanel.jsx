import React from 'react';
import { X } from 'lucide-react';
import { PointsList } from './PointsList';
import { PointDetailCard } from './PointDetailCard';
import './SidePanel.css';

export function SidePanel({
  filteredPoints,
  selectedPoint,
  selectedPointId,
  onSelectPoint,
  onBackToList,
  mobileOpen,
  onCloseMobile,
  onShowToast
}) {
  const isDetailMode = !!selectedPoint;
  const countText = `${filteredPoints.length} ${filteredPoints.length === 1 ? 'local' : 'locais'}`;

  return (
    <aside className={`side-panel ${mobileOpen ? 'open-mobile' : ''}`} id="sidePanel">
      {/* Cabeçalho do Painel */}
      <div className="panel-header">
        <div className="panel-title-group">
          <h2 className="panel-heading">
            {isDetailMode ? 'Detalhes do Local' : 'Pontos no Distrito Federal'}
          </h2>
          {!isDetailMode && (
            <span className="panel-counter">{countText}</span>
          )}
        </div>
        <button 
          type="button" 
          className="panel-close-btn"
          onClick={onCloseMobile}
          aria-label="Fechar painel"
        >
          <X size={20} />
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="panel-body">
        {isDetailMode ? (
          <PointDetailCard 
            point={selectedPoint} 
            onBack={onBackToList}
            onShowToast={onShowToast}
          />
        ) : (
          <PointsList 
            points={filteredPoints}
            selectedPointId={selectedPointId}
            onSelectPoint={onSelectPoint}
          />
        )}
      </div>
    </aside>
  );
}
