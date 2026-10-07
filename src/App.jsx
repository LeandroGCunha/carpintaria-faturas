import React, { useState } from "react";
import InvoiceEditor from "./components/editor/InvoiceEditor";
import { ORCAMENTO_PADRAO, NOVO_ITEM } from "./constants/constants";
import { pb } from "./services/pocketbase";

export default function App() {
  const [orcamento, setOrcamento] = useState(ORCAMENTO_PADRAO);

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

  const subtotal = orcamento.itens.reduce(
    (acc, curr) => acc + (Number(curr.valor) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <InvoiceEditor
        orcamento={orcamento}
        subtotal={subtotal}
        onAtualizarCampo={atualizarCampo}
        onAdicionarLinha={adicionarLinha}
        onAtualizarLinha={atualizarLinha}
        onRemoverLinha={removerLinha}
      />
    </div>
  );
}
