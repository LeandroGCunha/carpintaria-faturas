import React, { useState } from "react";
import DocumentInfo from "./form/DocumentInfo";
import ClientInfo from "./form/ClientInfo";
import LineItems from "./form/LineItems";
import TaxAndNotes from "./form/TaxAndNotes";
import InvoiceDocument from "./preview/InvoiceDocument";
import {
  FileText,
  User,
  Hammer,
  Percent,
  ZoomIn,
  ZoomOut,
  Printer,
  Save,
  Loader2,
  FolderOpen,
  Plus,
} from "lucide-react";

const PASSOS = [
  {
    id: "doc",
    label: "Documento",
    desc: "Nº, data e validade",
    icon: FileText,
  },
  { id: "cliente", label: "Cliente", desc: "Nome, NIF e morada", icon: User },
  {
    id: "itens",
    label: "Trabalhos & Artigos",
    desc: "Móveis, medidas e preços",
    icon: Hammer,
  },
  {
    id: "taxas",
    label: "IVA & Condições",
    desc: "Impostos e notas de pagamento",
    icon: Percent,
  },
];

export default function InvoiceEditor({
  orcamento,
  subtotal,
  aGuardar,
  feedback,
  onGuardar,
  onAtualizarCampo,
  onAdicionarLinha,
  onAtualizarLinha,
  onAbrirHistorico, // <-- Novo
  onNovoOrcamento, // <-- Novo
  onRemoverLinha,
}) {
  const [passoAtivo, setPassoAtivo] = useState("itens");

  // Estado para controlar a visão geral (folha pequena para ver a página inteira)
  const [visaoGeral, setVisaoGeral] = useState(false);

  return (
    <div className="editor-shell h-screen w-full flex flex-col bg-slate-100 font-sans overflow-hidden relative">
      {/* Área Central com 2 Colunas de Scroll Independente */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* COLUNA ESQUERDA: Formulário com scroll independente */}
        <div className="lg:col-span-6 h-full overflow-y-auto p-6 border-r border-slate-200 space-y-4 print:hidden">
          {/* Menu de Etapas (Sticky no topo da coluna) */}
          <div className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-sm pb-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-200/80 p-1.5 rounded-xl border border-slate-300/40">
              {PASSOS.map((passo) => {
                const Icon = passo.icon;
                const ativo = passoAtivo === passo.id;
                return (
                  <button
                    key={passo.id}
                    type="button"
                    onClick={() => setPassoAtivo(passo.id)}
                    className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg text-center transition cursor-pointer ${
                      ativo
                        ? "bg-white text-blue-600 shadow-sm font-bold"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`mb-1 ${ativo ? "text-blue-600" : "text-slate-400"}`}
                    />
                    <span className="text-xs leading-tight">{passo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secção Ativa Conforme a Etapa Selecionada */}
          <div>
            {passoAtivo === "doc" && (
              <DocumentInfo dados={orcamento} onAtualizar={onAtualizarCampo} />
            )}

            {passoAtivo === "cliente" && (
              <ClientInfo dados={orcamento} onAtualizar={onAtualizarCampo} />
            )}

            {passoAtivo === "itens" && (
              <LineItems
                linhas={orcamento.itens}
                onAdicionarLinha={onAdicionarLinha}
                onAtualizarLinha={onAtualizarLinha}
                onRemoverLinha={onRemoverLinha}
              />
            )}

            {passoAtivo === "taxas" && (
              <TaxAndNotes
                aplicarIva={orcamento.aplicarIva}
                taxaIva={orcamento.taxaIva}
                observacoes={orcamento.observacoes}
                onMudarAplicarIva={(aplicar) =>
                  onAtualizarCampo("aplicarIva", aplicar)
                }
                onMudarIva={(taxa) => onAtualizarCampo("taxaIva", taxa)}
                onMudarObservacoes={(notas) =>
                  onAtualizarCampo("observacoes", notas)
                }
              />
            )}
          </div>

          {/* Navegação Rápida de Pé de Página */}
          <div className="flex justify-between items-center pt-2 pb-6">
            <button
              type="button"
              disabled={passoAtivo === "doc"}
              onClick={() => {
                const idx = PASSOS.findIndex((p) => p.id === passoAtivo);
                if (idx > 0) setPassoAtivo(PASSOS[idx - 1].id);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Etapa Anterior
            </button>

            <button
              type="button"
              disabled={passoAtivo === "taxas"}
              onClick={() => {
                const idx = PASSOS.findIndex((p) => p.id === passoAtivo);
                if (idx < PASSOS.length - 1) setPassoAtivo(PASSOS[idx + 1].id);
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Próxima Etapa →
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA: Folha A4 com scroll independente e suporte a escala */}
        <div className="print-document-area lg:col-span-6 h-full overflow-y-auto p-6 bg-slate-300/40 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible">
          <div
            className={`print-document-wrapper transition-transform duration-300 origin-top flex justify-center w-full ${
              visaoGeral ? "scale-[0.58] lg:scale-[0.62] -mb-96" : "scale-100"
            }`}
          >
            <InvoiceDocument orcamento={orcamento} subtotal={subtotal} />
          </div>
        </div>
      </div>

      {/* BOTÕES FLUTUANTES (Canto Inferior Direito) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 print:hidden">
        {/* Aviso de Sucesso ou Erro ao Gravar */}
        {feedback && (
          <span
            className={`text-xs font-bold px-3 py-2 rounded-full shadow-md transition-all ${
              feedback.tipo === "sucesso"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {feedback.texto}
          </span>
        )}

        {/* Botão Novo Orçamento */}
        <button
          type="button"
          onClick={onNovoOrcamento}
          title="Criar Novo Orçamento em Branco"
          className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 p-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
        >
          <Plus size={18} />
        </button>

        {/* Botão Abrir Histórico */}
        <button
          type="button"
          onClick={onAbrirHistorico}
          title="Abrir Histórico de Orçamentos"
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 font-bold text-xs cursor-pointer"
        >
          <FolderOpen size={18} />
          <span>Histórico</span>
        </button>

        {/* Botão de Guardar no PocketBase */}
        <button
          type="button"
          onClick={onGuardar}
          disabled={aGuardar}
          title={orcamento.id ? "Atualizar no Servidor" : "Guardar no Servidor"}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 font-bold text-xs cursor-pointer"
        >
          {aGuardar ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>A guardar...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>{orcamento.id ? "Atualizar" : "Guardar"}</span>
            </>
          )}
        </button>

        {/* Botão de Imprimir */}
        <button
          type="button"
          onClick={() => window.print()}
          title="Imprimir / Guardar em PDF"
          className="bg-slate-900 hover:bg-black text-white p-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
        >
          <Printer size={20} />
        </button>

        {/* Botão Flutuante de Visão Geral / Zoom */}
        <button
          type="button"
          onClick={() => setVisaoGeral((prev) => !prev)}
          title={visaoGeral ? "Voltar ao tamanho normal" : "Ver folha inteira"}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 font-bold text-xs cursor-pointer ${
            visaoGeral
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {visaoGeral ? (
            <>
              <ZoomIn size={18} />
              <span>Tamanho Real</span>
            </>
          ) : (
            <>
              <ZoomOut size={18} />
              <span>Ver Folha Inteira</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
