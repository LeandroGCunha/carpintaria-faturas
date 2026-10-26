export const TAXAS_IVA = [
  { label: "Isento (0%)", value: 0 },
  { label: "Reduzida (6%)", value: 6 },
  { label: "Normal (23%)", value: 23 },
];

export const NOVO_ITEM = () => ({
  id: Date.now(),
  descricao: "",
  modo: "fixo", // 'fixo' ou 'qtd'
  valor: 0,
  qtd: 1,
  precoUnit: 0,
});

export const ORCAMENTO_PADRAO = {
  // DocumentInfo
  numero: "ORC-2026/01",
  data: new Date().toISOString().split("T")[0],
  validadeDias: 150,

  // ClientInfo
  clienteNome: "",
  clienteNif: "",
  clienteTelefone: "",
  clienteMorada: "",

  // Tags
  tags: [],

  // LineItems
  itens: [
    {
      id: 1,
      descricao: "Móveis de cozinha por medida em termolaminado",
      modo: "fixo",
      valor: 3200,
      qtd: 1,
      precoUnit: 3200,
    },
  ],

  // TaxAndNotes
  aplicarIva: false,
  taxaIva: 23,
  observacoes:
    "Condições de pagamento: 50% na adjudicação e 50% na conclusão dos trabalhos.",
};

export const TAGS_SUGERIDAS = [
  "Cozinha",
  "Roupeiro",
  "Portas",
  "WC",
  "Escadas",
  "Telheiro",
  "Moveis",
  "Rodapé",
];
