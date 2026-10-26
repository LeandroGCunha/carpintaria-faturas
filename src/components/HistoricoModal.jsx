import React, { useEffect, useState } from "react";
import { orcamentosService } from "../services/orcamentosService";
import {
  X,
  Search,
  Trash2,
  Calendar,
  User,
  FileText,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function HistoricoModal({
  aberto,
  onFechar,
  onCarregarOrcamento,
}) {
  const [lista, setLista] = useState([]);
  const [aCarregar, setACarregar] = useState(false);
  const [filtro, setFiltro] = useState("");

  // Carregar os registos sempre que a gaveta abre
  useEffect(() => {
    if (aberto) {
      carregarDados();
    }
  }, [aberto]);

  const carregarDados = async () => {
    try {
      setACarregar(true);
      const dados = await orcamentosService.listar();
      setLista(dados);
    } catch (erro) {
      console.error("Erro ao listar orçamentos:", erro);
      alert("Erro ao carregar o histórico do servidor.");
    } finally {
      setACarregar(false);
    }
  };

  const handleEliminar = async (e, id, numero) => {
    e.stopPropagation(); // Evita abrir o orçamento ao clicar no lixo
    if (
      window.confirm(
        `Tem a certeza que deseja eliminar o orçamento ${numero || "selecionado"}?`,
      )
    ) {
      try {
        await orcamentosService.eliminar(id);
        setLista((prev) => prev.filter((item) => item.id !== id));
      } catch (erro) {
        console.error("Erro ao eliminar:", erro);
        alert("Não foi possível eliminar o orçamento.");
      }
    }
  };

  // Filtragem rápida por cliente ou número
  const orcamentosFiltrados = lista.filter((item) => {
    const termo = filtro.toLowerCase();
    const nome = (item.clienteNome || "").toLowerCase();
    const num = (item.numero || "").toLowerCase();
    const tags = Array.isArray(item.tags)
      ? item.tags.join(" ").toLowerCase()
      : "";

    return nome.includes(termo) || num.includes(termo) || tags.includes(termo);
  });

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity">
      {/* Painel Lateral Deslizante */}
      <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
        {/* Cabeçalho */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Histórico de Orçamentos
            </h2>
            <p className="text-xs text-slate-500">
              Trabalhos guardados no PocketBase
            </p>
          </div>
          <button
            onClick={onFechar}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Pesquisa */}
        <div className="p-3 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Pesquisar por cliente ou número..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Lista de Registos */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {aCarregar ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
              <Loader2 size={24} className="animate-spin text-blue-600" />
              <span className="text-xs">A carregar do servidor...</span>
            </div>
          ) : orcamentosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Nenhum orçamento encontrado.
            </div>
          ) : (
            orcamentosFiltrados.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onCarregarOrcamento(item);
                  onFechar();
                }}
                className="group relative border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 p-3 rounded-xl transition cursor-pointer flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {item.numero || "Sem Número"}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 mt-1">
                      {item.clienteNome || "Cliente Não Definido"}
                    </h3>
                  </div>

                  <span className="text-sm font-extrabold text-emerald-600">
                    {Number(item.total || 0).toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>

                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Detalhes de Rodapé */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {item.data || item.created?.substring(0, 10)}
                    </span>
                    <span>
                      {Array.isArray(item.itens) ? item.itens.length : 0}{" "}
                      artigos
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleEliminar(e, item.id, item.numero)}
                      title="Eliminar orçamento"
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={14} />
                    </button>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5 text-[11px]">
                      Abrir <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé da Gaveta */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <span className="text-[11px] text-slate-400">
            Total: {orcamentosFiltrados.length} orçamentos
          </span>
        </div>
      </div>
    </div>
  );
}
