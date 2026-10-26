import React from 'react';
import { SearchX } from 'lucide-react';
import { PointCardItem } from './PointCardItem';

export function PointsList({ points, selectedPointId, onSelectPoint }) {
  if (points.length === 0) {
    return (
      <div className="empty-state">
        <SearchX className="empty-state-icon" size={48} />
        <h3>Nenhum ponto encontrado</h3>
        <p>Tente selecionar outra categoria de resíduo ou remover os filtros de busca.</p>
      </div>
    );
  }

  return (
    <div className="points-list-container">
      {points.map(point => (
        <PointCardItem
          key={point.id}
          point={point}
          isSelected={selectedPointId === point.id}
          onSelect={onSelectPoint}
        />
      ))}
    </div>
  );
}
