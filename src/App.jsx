import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { FilterBar } from './components/FilterBar/FilterBar';
import { MapView } from './components/Map/MapView';
import { SidePanel } from './components/SidePanel/SidePanel';
import { AboutSection } from './components/About/AboutSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { Toast } from './components/UI/Toast';
import { usePointsFilter } from './hooks/usePointsFilter';
import './App.css';

export function App() {
  const [currentView, setCurrentView] = useState('mapa');
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    filteredPoints,
    selectedPoint,
    selectedPointId,
    setSelectedPointId,
    selectedCategory,
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    searchQuery,
    setSearchQuery,
    categoryCounts,
    addSuggestedPoint
  } = usePointsFilter();

  // Gerencia classe map-view-active no body
  useEffect(() => {
    document.body.classList.toggle('map-view-active', currentView === 'mapa');
  }, [currentView]);

  // Função para exibir Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Navegação entre abas
  const navigateToView = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Seleção de um ponto
  const handleSelectPoint = (pointId, openSheetOnMobile = false) => {
    setSelectedPointId(pointId);
    if (openSheetOnMobile && window.innerWidth <= 860) {
      setMobileSheetOpen(true);
    }
  };

  return (
    <div className="app-layout">
      {/* Cabeçalho */}
      <Header 
        currentView={currentView}
        onNavigate={navigateToView}
      />

      {/* Conteúdo Principal */}
      <main className="main-content">
        {currentView === 'mapa' && (
          <section className="view-mapa" aria-label="Visualização do Mapa">
            {/* Barra de Filtros e Busca Flutuante */}
            <FilterBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              categoryCounts={categoryCounts}
            />

            {/* Layout Mapa + Painel Lateral */}
            <div className="map-layout">
              <MapView 
                filteredPoints={filteredPoints}
                selectedPoint={selectedPoint}
                onSelectPoint={handleSelectPoint}
                onOpenMobileSheet={() => setMobileSheetOpen(true)}
                onShowToast={showToast}
              />

              <SidePanel 
                filteredPoints={filteredPoints}
                selectedPoint={selectedPoint}
                selectedPointId={selectedPointId}
                onSelectPoint={handleSelectPoint}
                onBackToList={() => setSelectedPointId(null)}
                mobileOpen={mobileSheetOpen}
                onCloseMobile={() => setMobileSheetOpen(false)}
                onShowToast={showToast}
              />
            </div>
          </section>
        )}

        {currentView === 'sobre' && (
          <AboutSection 
            onNavigateToMap={() => navigateToView('mapa')}
            onNavigateToContact={() => navigateToView('contato')}
          />
        )}

        {currentView === 'contato' && (
          <ContactSection 
            onAddPoint={addSuggestedPoint}
            onShowToast={showToast}
            onNavigateToMap={() => navigateToView('mapa')}
          />
        )}
      </main>

      {/* Rodapé (exibido fora do modo mapa ou no final das páginas de rolagem) */}
      <Footer onNavigate={navigateToView} />

      {/* Notificações Toast */}
      <Toast toast={toast} />
    </div>
  );
}

export default App;
