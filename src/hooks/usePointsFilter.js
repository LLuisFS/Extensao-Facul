import { useState, useMemo } from 'react';
import { INITIAL_POINTS } from '../data/collectionPoints';

export function usePointsFilter() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedRegion, setSelectedRegion] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPointId, setSelectedPointId] = useState(null);

  // Filtra os pontos com memoização de alta performance
  const filteredPoints = useMemo(() => {
    return points.filter(point => {
      // Filtro de categoria
      const matchCategory = selectedCategory === 'todos' || point.categoria === selectedCategory;

      // Filtro de região
      const matchRegion = selectedRegion === 'todas' || 
        point.regiao.toLowerCase().includes(selectedRegion.toLowerCase());

      // Filtro de busca textual
      let matchSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const nome = point.nome.toLowerCase();
        const endereco = point.endereco.toLowerCase();
        const regiao = point.regiao.toLowerCase();
        const materiais = point.materiais.join(' ').toLowerCase();

        matchSearch = nome.includes(query) || 
          endereco.includes(query) || 
          regiao.includes(query) || 
          materiais.includes(query);
      }

      return matchCategory && matchRegion && matchSearch;
    });
  }, [points, selectedCategory, selectedRegion, searchQuery]);

  // Ponto atualmente selecionado
  const selectedPoint = useMemo(() => {
    return points.find(p => p.id === selectedPointId) || null;
  }, [points, selectedPointId]);

  // Contagem dinâmica por categoria
  const categoryCounts = useMemo(() => {
    const counts = { todos: points.length };
    points.forEach(p => {
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    });
    return counts;
  }, [points]);

  // Adiciona um ponto sugerido pela comunidade
  const addSuggestedPoint = (newPointData) => {
    const newPoint = {
      id: points.length + 1,
      nome: `${newPointData.localNome || 'Novo Ecoponto'} (Sugerido)`,
      categoria: newPointData.categoria || 'reciclavel',
      categoriaNome: 'Ponto Sugerido (Em Validação)',
      icone: 'recycle',
      cor: '#10b981',
      regiao: newPointData.regiao || 'Distrito Federal',
      endereco: newPointData.mensagem || 'Endereço em verificação cadastral',
      cep: '70000-000',
      lat: -15.7942 + (Math.random() - 0.5) * 0.08,
      lng: -47.8822 + (Math.random() - 0.5) * 0.08,
      horario: 'Horário em verificação',
      statusHorario: 'Novo Cadastro',
      telefone: newPointData.telefone || '(61) Em validação',
      email: newPointData.email,
      materiais: newPointData.materiais 
        ? newPointData.materiais.split(',').map(m => m.trim()) 
        : ['Recicláveis Gerais'],
      descricao: `Ponto sugerido por ${newPointData.nome} para avaliação da equipe de extensão universitária.`,
      destaque: true
    };

    setPoints(prev => [newPoint, ...prev]);
    setSelectedPointId(newPoint.id);
    return newPoint;
  };

  return {
    points,
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
  };
}
