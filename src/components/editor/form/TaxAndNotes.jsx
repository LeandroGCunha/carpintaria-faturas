import React from 'react';
import Card from '../../ui/Card';
import { TAXAS_IVA } from '../../../constants/constants';

export default function TaxAndNotes({ taxaIva, observacoes, onMudarIva, onMudarObservacoes }) {
  return (
    <Card title="Impostos & Condições">
      <div className="space-y-4">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  taxaIva === item.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
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