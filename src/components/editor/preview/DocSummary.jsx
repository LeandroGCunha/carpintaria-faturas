import React from "react";

export default function DocSummary({
  subtotal,
  aplicarIva,
  taxaIva,
  observacoes,
}) {
  const valorIva = aplicarIva ? (subtotal * taxaIva) / 100 : 0;
  const total = subtotal + valorIva;

  return (
    <div className="mt-6 pt-4 border-t border-slate-200">
      <div className="flex justify-between items-start gap-8">
        {/* Observações / Termos */}
        <div className="flex-1 text-xs text-slate-600">
          <p className="font-bold text-slate-800 uppercase tracking-wide mb-1">
            Condições & Observações:
          </p>
          <p className="whitespace-pre-line leading-relaxed text-slate-500">
            {observacoes ||
              "Proposta válida pelo período indicado. Adjudicação mediante sinal."}
          </p>
        </div>

        {/* Resumo de Valores */}
        <div className="w-56 space-y-1.5 text-xs text-right">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-900 font-mono">
              {subtotal.toFixed(2)} €
            </span>
          </div>

          {aplicarIva ? (
            <div className="flex justify-between text-slate-600">
              <span>IVA ({taxaIva}%):</span>
              <span className="font-semibold text-slate-900 font-mono">
                {valorIva.toFixed(2)} €
              </span>
            </div>
          ) : (
            <div className="flex justify-between text-slate-600">
              <span>IVA:</span>
              <span className="font-semibold text-slate-900">Sem IVA</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t-2 border-slate-900 text-sm">
            <span className="font-black text-slate-900 uppercase">Total:</span>
            <span className="font-black text-lg text-slate-900 font-mono">
              {total.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
