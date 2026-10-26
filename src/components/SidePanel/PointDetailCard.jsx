import React from 'react';
import { ArrowLeft, MapPin, Copy, Clock, Phone, Navigation, Share2 } from 'lucide-react';

export function PointDetailCard({ point, onBack, onShowToast }) {
  if (!point) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(point.endereco)
      .then(() => onShowToast('Endereço copiado para a área de transferência!', 'success'))
      .catch(() => onShowToast('Não foi possível copiar o endereço.', 'error'));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: point.nome,
        text: `Ponto de Coleta Sustentável no DF: ${point.nome} - ${point.endereco}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${point.nome} - ${point.endereco}`);
      onShowToast('Informações do ponto copiadas!', 'success');
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
  const phoneClean = point.telefone ? point.telefone.replace(/\D/g, '') : '';

  return (
    <article className="detail-card" aria-live="polite">
      {/* Botão Voltar */}
      <button type="button" className="back-to-list-btn" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Voltar à lista completa</span>
      </button>

      {/* Cabeçalho do Card */}
      <div className="detail-header">
        <span 
          className="category-pill"
          style={{ 
            backgroundColor: `${point.cor}20`, 
            color: point.cor, 
            borderColor: `${point.cor}40` 
          }}
        >
          {point.categoriaNome}
        </span>
        <span className="status-badge">{point.statusHorario}</span>
      </div>

      <h3 className="detail-title">{point.nome}</h3>
      <p className="detail-region">Região: {point.regiao}</p>

      {/* Linhas de Informações */}
      <div className="detail-section">
        {/* Endereço */}
        <div className="info-row">
          <MapPin className="info-icon" size={20} />
          <div className="info-content">
            <span className="info-label">Endereço Completo:</span>
            <p className="info-value">{point.endereco}</p>
            <button 
              type="button" 
              className="btn-copy-address" 
              onClick={handleCopyAddress}
              title="Copiar endereço"
            >
              <Copy size={13} />
              <span>Copiar Endereço</span>
            </button>
          </div>
        </div>

        {/* Horários */}
        <div className="info-row">
          <Clock className="info-icon" size={20} />
          <div className="info-content">
            <span className="info-label">Horário de Funcionamento:</span>
            <p className="info-value">{point.horario}</p>
          </div>
        </div>

        {/* Contato */}
        <div className="info-row">
          <Phone className="info-icon" size={20} />
          <div className="info-content">
            <span className="info-label">Contato:</span>
            <p className="info-value">
              {phoneClean ? (
                <a href={`tel:${phoneClean}`} className="contact-tel-link">
                  {point.telefone}
                </a>
              ) : (
                point.telefone
              )}
              {point.email && (
                <>
                  <br />
                  <a href={`mailto:${point.email}`} className="contact-email-link">
                    {point.email}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Materiais Aceitos */}
      {point.materiais && point.materiais.length > 0 && (
        <div className="detail-materials-block">
          <span className="materials-title">Materiais Aceitos para Descarte:</span>
          <div className="materials-tags">
            {point.materiais.map((mat, idx) => (
              <span key={idx} className="material-tag">
                {mat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Descrição / Instruções */}
      <div className="detail-desc-box">
        <p>{point.descricao}</p>
      </div>

      {/* Botões de Ação */}
      <div className="detail-actions">
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary btn-route"
        >
          <Navigation size={17} />
          <span>Como Chegar (Google Maps)</span>
        </a>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={handleShare}
          title="Compartilhar Ponto"
        >
          <Share2 size={17} />
          <span>Compartilhar</span>
        </button>
      </div>
    </article>
  );
}
