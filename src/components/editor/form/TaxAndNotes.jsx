import React from "react";
import Card from "../../ui/Card";
import { TAXAS_IVA } from "../../../constants/constants";

export default function TaxAndNotes({
  aplicarIva,
  taxaIva,
  observacoes,
  onMudarAplicarIva,
  onMudarIva,
  onMudarObservacoes,
}) {
  return (
    <Card title="Impostos & Condições">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Aplicar IVA
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Desative para emitir o orçamento sem IVA.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aplicarIva}
              onChange={(e) => onMudarAplicarIva(e.target.checked)}
              className="sr-only peer"
            />
            <span className="relative w-10 h-6 bg-slate-300 rounded-full transition peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition peer-checked:after:translate-x-4" />
            <span className="text-xs font-bold text-slate-700">
              {aplicarIva ? "Com IVA" : "Sem IVA"}
            </span>
          </label>
        </div>

        {/* Seleção do IVA a partir das constantes */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Taxa de IVA Aplicável
          </span>
          <div className="flex items-center gap-2">
            {TAXAS_IVA.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => onMudarIva(item.value)}
                disabled={!aplicarIva}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  taxaIva === item.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                } ${!aplicarIva ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Caixa de Observações / Condições */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Observações / Condições de Pagamento
          </label>
          <textarea
            rows="3"
            value={observacoes}
            onChange={(e) => onMudarObservacoes(e.target.value)}
            placeholder="Ex: Condições de pagamento, prazos de entrega ou notas técnicas..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
