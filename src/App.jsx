import React, { useState } from "react";
import InvoiceEditor from "./components/editor/InvoiceEditor";
import HistoricoModal from "./components/HistoricoModal";
import { ORCAMENTO_PADRAO, NOVO_ITEM } from "./constants/constants";
import { orcamentosService } from "./services/orcamentosService";

export default function App() {
  const [orcamento, setOrcamento] = useState(ORCAMENTO_PADRAO);
  const [aGuardar, setAGuardar] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [historicoAberto, setHistoricoAberto] = useState(false);

  const atualizarCampo = (campo, valor) => {
    setOrcamento((prev) => ({ ...prev, [campo]: valor }));
  };

  const adicionarLinha = () => {
    setOrcamento((prev) => ({ ...prev, itens: [...prev.itens, NOVO_ITEM()] }));
  };

  const atualizarLinha = (id, campo, valor) => {
    setOrcamento((prev) => ({
      ...prev,
      itens: prev.itens.map((item) => {
        if (item.id !== id) return item;
        const atualizado = { ...item, [campo]: valor };
        if (atualizado.modo === "qtd") {
          const qtd = Number(atualizado.qtd) || 0;
          const preco = Number(atualizado.precoUnit) || 0;
          atualizado.valor = qtd * preco;
        }
        return atualizado;
      }),
    }));
  };

  const removerLinha = (id) => {
    setOrcamento((prev) => ({
      ...prev,
      itens: prev.itens.filter((item) => item.id !== id),
    }));
  };

  // Carregar orçamento selecionado da gaveta
  const handleCarregarOrcamento = (orcamentoSelecionado) => {
    setOrcamento({
      id: orcamentoSelecionado.id,
      numero: orcamentoSelecionado.numero || "",
      data: orcamentoSelecionado.data || "",
      validadeDias: orcamentoSelecionado.validadeDias || 30,
      clienteNome: orcamentoSelecionado.clienteNome || "",
      clienteNif: orcamentoSelecionado.clienteNif || "",
      clienteTelefone: orcamentoSelecionado.clienteTelefone || "",
      clienteMorada: orcamentoSelecionado.clienteMorada || "",
      itens: orcamentoSelecionado.itens || [],
      tags: orcamentoSelecionado.tags || [],
      aplicarIva: Boolean(orcamentoSelecionado.aplicarIva),
      taxaIva: orcamentoSelecionado.taxaIva ?? 23,
      observacoes: orcamentoSelecionado.observacoes || "",
    });
  };

  // Botão para limpar e começar um novo em branco
  const handleNovoOrcamento = () => {
    if (window.confirm("Deseja iniciar um novo orçamento em branco?")) {
      setOrcamento(ORCAMENTO_PADRAO);
    }
  };

  // Cálculo de Subtotal e Total
  const subtotal = orcamento.itens.reduce(
    (acc, curr) => acc + (Number(curr.valor) || 0),
    0,
  );
  const valorIva = orcamento.aplicarIva
    ? (subtotal * Number(orcamento.taxaIva || 0)) / 100
    : 0;
  const totalFinal = subtotal + valorIva;

  // Gravar no PocketBase
  const handleGuardar = async () => {
    try {
      setAGuardar(true);
      setFeedback(null);

      const dadosParaGuardar = {
        ...orcamento,
        total: totalFinal,
      };

      const registo = await orcamentosService.salvar(dadosParaGuardar);

      if (!orcamento.id && registo?.id) {
        setOrcamento((prev) => ({ ...prev, id: registo.id }));
      }

      setFeedback({ tipo: "sucesso", texto: "Guardado com sucesso!" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (erro) {
      console.error("Erro ao guardar:", erro);
      setFeedback({ tipo: "erro", texto: "Erro ao guardar no servidor." });
      setTimeout(() => setFeedback(null), 4000);
    } finally {
      setAGuardar(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <InvoiceEditor
        orcamento={orcamento}
        subtotal={subtotal}
        onAtualizarCampo={atualizarCampo}
        onAdicionarLinha={adicionarLinha}
        onAtualizarLinha={atualizarLinha}
        onRemoverLinha={removerLinha}
        onGuardar={handleGuardar}
        onAbrirHistorico={() => setHistoricoAberto(true)}
        onNovoOrcamento={handleNovoOrcamento}
        aGuardar={aGuardar}
        feedback={feedback}
      />

      {/* Gaveta de Histórico */}
      <HistoricoModal
        aberto={historicoAberto}
        onFechar={() => setHistoricoAberto(false)}
        onCarregarOrcamento={handleCarregarOrcamento}
      />
    </div>
  );
}
