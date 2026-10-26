import React, { useState } from 'react';
import { Map, Info, Mail, Plus, Menu, X, Recycle } from 'lucide-react';
import './Header.css';

export function Header({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="header-container">
        {/* Logo & Marca Acadêmica */}
        <button 
          type="button" 
          className="brand-link" 
          onClick={() => handleNavClick('mapa')}
          aria-label="EcoPonto DF Página Inicial"
        >
          <div className="brand-icon-wrapper">
            <Recycle className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              EcoPonto <span className="highlight-df">DF</span>
            </div>
            <div className="brand-badge">Extensão Universitária</div>
          </div>
        </button>

        {/* Navegação Desktop */}
        <nav className="main-nav" aria-label="Navegação Principal">
          <ul className="nav-list">
            <li className="nav-item">
              <button 
                type="button" 
                className={`nav-link ${currentView === 'mapa' ? 'active' : ''}`}
                onClick={() => handleNavClick('mapa')}
              >
                <Map size={17} />
                <span>Mapa de Coleta</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                type="button" 
                className={`nav-link ${currentView === 'sobre' ? 'active' : ''}`}
                onClick={() => handleNavClick('sobre')}
              >
                <Info size={17} />
                <span>Sobre o Projeto</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                type="button" 
                className={`nav-link ${currentView === 'contato' ? 'active' : ''}`}
                onClick={() => handleNavClick('contato')}
              >
                <Mail size={17} />
                <span>Contato</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Ações do Header */}
        <div className="header-actions">
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => handleNavClick('contato')}
          >
            <Plus size={16} />
            <span>Sugerir Ponto</span>
          </button>

          {/* Toggle Menu Mobile */}
          <button 
            type="button" 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Alternar Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Drawer de Navegação Mobile */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-list">
            <li>
              <button 
                type="button" 
                className={`mobile-nav-link ${currentView === 'mapa' ? 'active' : ''}`}
                onClick={() => handleNavClick('mapa')}
              >
                <Map size={20} />
                <span>Mapa de Coleta</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className={`mobile-nav-link ${currentView === 'sobre' ? 'active' : ''}`}
                onClick={() => handleNavClick('sobre')}
              >
                <Info size={20} />
                <span>Sobre o Projeto</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className={`mobile-nav-link ${currentView === 'contato' ? 'active' : ''}`}
                onClick={() => handleNavClick('contato')}
              >
                <Mail size={20} />
                <span>Contato & Sugestão</span>
              </button>
            </li>
          </ul>
          <div className="mobile-drawer-footer">
            <button 
              type="button" 
              className="btn btn-primary w-full"
              onClick={() => handleNavClick('contato')}
            >
              <Plus size={18} />
              <span>Sugerir Novo Ponto no DF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
