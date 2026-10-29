import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, Lightbulb } from 'lucide-react';
import './Contact.css';

export function ContactSection({ onAddPoint, onShowToast, onNavigateToMap }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoMensagem: 'sugestao',
    localNome: '',
    regiao: '',
    materiais: '',
    mensagem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      onShowToast('Por favor, preencha todos os campos obrigatórios (*).', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      onShowToast(
        'Obrigado! Sua contribuição foi enviada para validação da equipe de extensão universitária.',
        'success'
      );

      // Se for sugestão de ponto, adiciona ao mapa interativo!
      if (formData.tipoMensagem === 'sugestao' && formData.localNome) {
        onAddPoint(formData);
        setTimeout(() => {
          onNavigateToMap();
        }, 1200);
      }

      // Limpa formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipoMensagem: 'sugestao',
        localNome: '',
        regiao: '',
        materiais: '',
        mensagem: ''
      });
    }, 800);
  };

  return (
    <section className="contact-view-section" aria-label="Contato e Envio de Sugestões">
      <div className="info-page-container">
        <div className="contact-grid">
          
          {/* Painel Esquerdo: Informações de Contato */}
          <div className="contact-info-panel">
            <div className="hero-badge">Canal Comunitário</div>
            <h1 className="contact-title">Fale Conosco & Sugira Pontos</h1>
            <p className="contact-text">
              Conhece um ponto de coleta seletiva, ecoponto, cooperativa de reciclagem ou ponto de coleta de baterias no seu bairro que ainda não está no mapa? Envie para nós!
            </p>

            <div className="contact-details-list">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>E-mail Institucional:</strong>
                  <p>extensao.ecoponto@faculdade.edu.br</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Localização:</strong>
                  <p>UDF - Campus Sede • Distrito Federal - Brasil</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>Atendimento de Validação:</strong>
                  <p>Segunda a Sexta, das 08h às 18h</p>
                </div>
              </div>
            </div>

            {/* Dica de Sustentabilidade */}
            <div className="sustainability-tip">
              <div className="tip-icon">
                <Lightbulb size={24} color="#059669" />
              </div>
              <div className="tip-body">
                <strong>Você sabia?</strong>
                <p>
                  O DF produz mais de 2.500 toneladas diárias de lixo. A correta separação e entrega nos pontos mapeados garante renda direta para milhares de famílias de catadores.
                </p>
              </div>
            </div>
          </div>

          {/* Painel Direito: Formulário de Sugestão */}
          <div className="contact-form-card">
            <h2 className="form-title">Sugerir Ponto de Coleta ou Mensagem</h2>
            <p className="form-subtitle">
              Preencha os dados abaixo. Nossa equipe acadêmica revisará e adicionará o local ao mapa oficial.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="formNome">
                  Seu Nome Completo <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="formNome" 
                  name="nome"
                  required 
                  placeholder="Ex: Maria Silva" 
                  className="form-control"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="formEmail">
                    Seu E-mail <span className="required">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="formEmail" 
                    name="email"
                    required 
                    placeholder="seuemail@exemplo.com" 
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formTelefone">Telefone / WhatsApp</label>
                  <input 
                    type="tel" 
                    id="formTelefone" 
                    name="telefone"
                    placeholder="(61) 99999-9999" 
                    className="form-control"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formTipoMensagem">
                  Finalidade do Contato <span className="required">*</span>
                </label>
                <select 
                  id="formTipoMensagem" 
                  name="tipoMensagem"
                  className="form-control" 
                  required
                  value={formData.tipoMensagem}
                  onChange={handleChange}
                >
                  <option value="sugestao">Sugerir Novo Ponto de Coleta no DF</option>
                  <option value="correcao">Informar Correção em Ponto Existente</option>
                  <option value="duvida">Dúvida sobre o Projeto de Extensão</option>
                  <option value="parceria">Proposta de Parceria Institucional</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="formLocalNome">Nome do Ponto / Estabelecimento</label>
                  <input 
                    type="text" 
                    id="formLocalNome" 
                    name="localNome"
                    placeholder="Ex: PEV Praça dos Pássaros" 
                    className="form-control"
                    value={formData.localNome}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formRegiao">Região Administrativa (RA)</label>
                  <input 
                    type="text" 
                    id="formRegiao" 
                    name="regiao"
                    placeholder="Ex: Guará II, Ceilândia, Taguatinga" 
                    className="form-control"
                    value={formData.regiao}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formMateriais">Materiais Aceitos no Local</label>
                <input 
                  type="text" 
                  id="formMateriais" 
                  name="materiais"
                  placeholder="Ex: Pilhas, Óleo de Cozinha, Recicláveis secos..." 
                  className="form-control"
                  value={formData.materiais}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="formMensagem">
                  Detalhes / Endereço / Observações <span className="required">*</span>
                </label>
                <textarea 
                  id="formMensagem" 
                  name="mensagem"
                  rows={4} 
                  required 
                  placeholder="Descreva o endereço de referência, horários ou sua mensagem para nossa equipe..." 
                  className="form-control"
                  value={formData.mensagem}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                <Send size={17} />
                <span>
                  {isSubmitting ? 'Enviando dados...' : 'Enviar Sugestão para Validação'}
                </span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
