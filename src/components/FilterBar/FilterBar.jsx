import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIAS, REGIOES_DF } from '../../data/categories';
import './FilterBar.css';

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedRegion,
  onRegionChange,
  categoryCounts
}) {
  return (
    <div className="map-top-bar">
      {/* Caixa de Pesquisa em Tempo Real */}
      <div className="map-search-box">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Buscar por bairro, RA (ex: Asa Sul, Ceilândia) ou local..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button 
            type="button" 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Chips de Categorias de Resíduos */}
      <div className="filter-chips-container">
        {Object.values(CATEGORIAS).map(cat => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              className={`filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => onCategorySelect(cat.id)}
            >
              <span 
                className="chip-dot" 
                style={{ backgroundColor: cat.cor }}
              />
              <span>{cat.nome}</span>
              {cat.id === 'todos' && (
                <span className="chip-count">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seletor de Região Administrativa do DF */}
      <div className="region-select-wrapper">
        <select 
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          aria-label="Filtrar por Região Administrativa"
        >
          {REGIOES_DF.map(reg => (
            <option key={reg.valor} value={reg.valor}>
              {reg.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
