/**
 * Configuração das Categorias de Resíduos do DF
 */

export const CATEGORIAS = {
  todos: {
    id: "todos",
    nome: "Todos os Pontos",
    icone: "Layers",
    cor: "#0f172a",
    bgCor: "rgba(15, 23, 42, 0.08)"
  },
  reciclavel: {
    id: "reciclavel",
    nome: "Recicláveis (PEV)",
    icone: "Recycle",
    cor: "#10b981",
    bgCor: "rgba(16, 185, 129, 0.12)",
    borda: "#10b981"
  },
  eletronico: {
    id: "eletronico",
    nome: "Lixo Eletrônico",
    icone: "Cpu",
    cor: "#0ea5e9",
    bgCor: "rgba(14, 165, 233, 0.12)",
    borda: "#0ea5e9"
  },
  entulho: {
    id: "entulho",
    nome: "Papa-Entulho",
    icone: "Truck",
    cor: "#f59e0b",
    bgCor: "rgba(245, 158, 11, 0.12)",
    borda: "#f59e0b"
  },
  oleo: {
    id: "oleo",
    nome: "Óleo Vegetal",
    icone: "Droplet",
    cor: "#8b5cf6",
    bgCor: "rgba(139, 92, 246, 0.12)",
    borda: "#8b5cf6"
  },
  organico: {
    id: "organico",
    nome: "Compostagem",
    icone: "Leaf",
    cor: "#84cc16",
    bgCor: "rgba(132, 204, 22, 0.12)",
    borda: "#84cc16"
  }
};

export const REGIOES_DF = [
  { valor: "todas", label: "Todas as Regiões do DF" },
  { valor: "Plano Piloto", label: "Plano Piloto (Asa Sul / Norte)" },
  { valor: "Taguatinga", label: "Taguatinga" },
  { valor: "Ceilândia", label: "Ceilândia" },
  { valor: "Guará", label: "Guará" },
  { valor: "Águas Claras", label: "Águas Claras" },
  { valor: "Samambaia", label: "Samambaia" },
  { valor: "Lago Norte", label: "Lago Norte" },
  { valor: "Sobradinho", label: "Sobradinho" },
  { valor: "Planaltina", label: "Planaltina" },
  { valor: "Gama", label: "Gama" },
  { valor: "Estrutural", label: "Estrutural / SCIA" }
];
