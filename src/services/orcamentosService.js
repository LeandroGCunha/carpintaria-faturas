import { pb } from "./pocketbase";

export const orcamentosService = {
  // Obter todos os orçamentos (mais recentes primeiro)
  async listar() {
    return await pb.collection("orcamentos").getFullList({
      sort: "-created",
    });
  },

  // Guardar orçamento (cria novo ou atualiza se já tiver id)
  async salvar(orcamento) {
    const payload = {
      numero: orcamento.numero || "",
      data: orcamento.data || "",
      validadeDias: Number(orcamento.validadeDias) || 30,
      clienteNome: orcamento.clienteNome || "",
      clienteNif: orcamento.clienteNif || "",
      clienteTelefone: orcamento.clienteTelefone || "",
      clienteMorada: orcamento.clienteMorada || "",
      itens: orcamento.itens || [],
      tags: orcamento.tags || [],
      aplicarIva: Boolean(orcamento.aplicarIva),
      taxaIva: orcamento.aplicarIva ? Number(orcamento.taxaIva || 23) : 0,
      total: Number(orcamento.total) || 0,
    };

    if (orcamento.id) {
      return await pb.collection("orcamentos").update(orcamento.id, payload);
    } else {
      return await pb.collection("orcamentos").create(payload);
    }
  },

  // Apagar orçamento
  async eliminar(id) {
    return await pb.collection("orcamentos").delete(id);
  },
};
