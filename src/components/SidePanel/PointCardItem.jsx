import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export function PointCardItem({ point, isSelected, onSelect }) {
  const regionLabel = point.regiao.split('(')[0].trim();

  return (
    <div 
      className={`point-card-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(point.id)}
    >
      <div className="item-top">
        <span 
          className="item-badge" 
          style={{ 
            backgroundColor: `${point.cor}18`, 
            color: point.cor, 
            borderColor: `${point.cor}35` 
          }}
        >
          {point.categoriaNome}
        </span>
        <span className="item-region">{regionLabel}</span>
      </div>

      <h3 className="item-name">{point.nome}</h3>
      <p className="item-address">{point.endereco}</p>

      <div className="item-footer">
        <span className="item-hours">
          <Clock size={13} />
          {point.statusHorario}
        </span>
        <span className="item-action-hint">
          Ver Detalhes <ArrowRight size={13} />
        </span>
      </div>
    </div>
  );
}
