import React from 'react';
import { Recycle } from 'lucide-react';
import './Footer.css';

export function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* Coluna 1: Marca & Descrição */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <Recycle size={28} className="footer-logo-icon" />
            <span className="footer-brand-title">EcoPonto DF</span>
          </div>
          <p className="footer-desc">
            Mapeamento Comunitário e Acadêmico de Pontos de Coleta Seletiva e Ecopontos no Distrito Federal. Desenvolvido no âmbito das atividades de Extensão Universitária.
          </p>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div className="footer-col">
          <h4 className="footer-heading">Navegação Rápida</h4>
          <ul className="footer-links">
            <li>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('mapa')}>
                Mapa Interativo
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('sobre')}>
                Sobre a Extensão
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => onNavigate('contato')}>
                Sugerir Ponto no DF
              </button>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Links Úteis */}
        <div className="footer-col">
          <h4 className="footer-heading">Links Úteis no DF</h4>
          <ul className="footer-links">
            <li>
              <a href="https://www.slu.df.gov.br" target="_blank" rel="noopener noreferrer">
                Serviço de Limpeza Urbana (SLU DF)
              </a>
            </li>
            <li>
              <a href="https://reciclotech.org.br" target="_blank" rel="noopener noreferrer">
                Programa Reciclotech DF
              </a>
            </li>
            <li>
              <a href="http://www.brasilia.df.gov.br" target="_blank" rel="noopener noreferrer">
                Governo do Distrito Federal
              </a>
            </li>
            <li>
              <a href="https://brasil.un.org/pt-br/sdgs" target="_blank" rel="noopener noreferrer">
                ODS 11 e 12 da ONU
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Contato Acadêmico */}
        <div className="footer-col">
          <h4 className="footer-heading">Contato Acadêmico</h4>
          <p className="footer-contact-item">
            <strong>Coordenação de Extensão:</strong><br />
            extensao.ecoponto@faculdade.edu.br
          </p>
          <p className="footer-contact-item">
            <strong>Central de Atendimento DF:</strong><br />
            Telefone 162 (SLU / Ouvidoria GDF)
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2026 EcoPonto DF • Projeto de Extensão Universitária. Todos os direitos reservados.</p>
          <p className="footer-motto">Pela preservação do Cerrado e das águas do Distrito Federal 🌿</p>
        </div>
      </div>
    </footer>
  );
}
