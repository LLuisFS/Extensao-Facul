import React from 'react';
import { Map, Plus, Globe, Users, ShieldAlert } from 'lucide-react';
import './About.css';

export function AboutSection({ onNavigateToMap, onNavigateToContact }) {
  return (
    <section className="about-view-section" aria-label="Sobre o Projeto de Extensão">
      <div className="info-page-container">
        
        {/* Hero */}
        <div className="info-hero">
          <div className="hero-badge">Projeto de Extensão Universitária • Distrito Federal</div>
          <h1 className="hero-title">Conectando a Comunidade do DF ao Descarte Sustentável</h1>
          <p className="hero-subtitle">
            Uma iniciativa acadêmica e comunitária dedicada a geolocalizar, mapear e facilitar o acesso da população de Brasília e Regiões Administrativas aos pontos de coleta seletiva, descarte de eletroeletrônicos e ecopontos.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">14+</div>
            <div className="stat-label">Pontos Estratégicos Mapeados no DF</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">11</div>
            <div className="stat-label">Regiões Administrativas Atendidas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Categorias Especializadas de Resíduos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Acesso Gratuito e Aberto</div>
          </div>
        </div>

        {/* Cards de Pilares ODS */}
        <div className="info-cards-grid">
          <div className="feature-card">
            <div className="feature-icon bg-green">
              <Globe size={24} />
            </div>
            <h3>ODS 11 & ODS 12 da ONU</h3>
            <p>
              O projeto está alinhado aos Objetivos de Desenvolvimento Sustentável da Agenda 2030, promovendo Cidades e Comunidades Sustentáveis e Consumo/Produção Responsáveis no Distrito Federal.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-blue">
              <Users size={24} />
            </div>
            <h3>Valorização dos Catadores</h3>
            <p>
              Destacamos cooperativas como a CENTCOOP e associações locais de reciclagem, encurtando o caminho entre o gerador de resíduo e quem vive da economia circular no DF.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bg-amber">
              <ShieldAlert size={24} />
            </div>
            <h3>Combate ao Descarte Irregular</h3>
            <p>
              Divulgação clara dos Papa-Entulhos do SLU/DF para combater o acúmulo de entulhos em áreas verdes, córregos e beiras de rodovias do Distrito Federal.
            </p>
          </div>
        </div>

        {/* Box Acadêmico */}
        <div className="academic-box">
          <h2>Metodologia de Extensão e Mapeamento Colaborativo</h2>
          <p>
            O levantamento foi realizado por estudantes e docentes por meio de visitas técnicas, validação de dados abertos governamentais (SLU, Governo do Distrito Federal e Reciclotech) e escuta com lideranças comunitárias.
          </p>
          <div className="academic-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={onNavigateToMap}
            >
              <Map size={18} />
              <span>Explorar Pontos no Mapa</span>
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onNavigateToContact}
            >
              <Plus size={18} />
              <span>Sugerir um Ponto de Coleta</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
