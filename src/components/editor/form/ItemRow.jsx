import React from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { Trash2 } from 'lucide-react';

export default function ItemRow({ linha, index, podeRemover, onAtualizar, onRemover }) {
  return (
    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 space-y-3">
      {/* Linha da descrição + botão de apagar */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label={`Trabalho / Artigo #${index + 1}`}
            placeholder="Ex: Roupeiro por medida em carvalho"
            value={linha.descricao}
            onChange={(e) => onAtualizar(linha.id, 'descricao', e.target.value)}
          />
        </div>
        {podeRemover && (
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => onRemover(linha.id)}
            title="Remover artigo"
            type="button"
          />
        )}
      </div>

      {/* Seleção do modo de cálculo */}
      <div className="flex items-center gap-6 text-xs font-semibold text-slate-600 pt-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`modo-${linha.id}`}
            checked={linha.modo === 'fixo'}
            onChange={() => onAtualizar(linha.id, 'modo', 'fixo')}
            className="text-blue-600 focus:ring-blue-500"
          />
          Preço Fixo / Medida
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`modo-${linha.id}`}
            checked={linha.modo === 'qtd'}
            onChange={() => onAtualizar(linha.id, 'modo', 'qtd')}
            className="text-blue-600 focus:ring-blue-500"
          />
          Quantidade × Preço Unitário
        </label>
      </div>

      {/* Campos de valor dependendo do modo escolhido */}
      {linha.modo === 'fixo' ? (
        <div className="max-w-xs">
          <Input
            label="Valor Total (€)"
            type="number"
            min="0"
            step="0.01"
            value={linha.valor || ''}
            onChange={(e) => onAtualizar(linha.id, 'valor', Number(e.target.value))}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <Input
            label="Quantidade"
            type="number"
            min="1"
            value={linha.qtd || ''}
            onChange={(e) => onAtualizar(linha.id, 'qtd', Number(e.target.value))}
          />
          <Input
            label="Preço Unitário (€)"
            type="number"
            min="0"
            step="0.01"
            value={linha.precoUnit || ''}
            onChange={(e) => onAtualizar(linha.id, 'precoUnit', Number(e.target.value))}
          />
          <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm flex justify-between items-center h-[38px]">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total:</span>
            <span className="font-bold text-slate-800">
              {(Number(linha.valor) || 0).toFixed(2)} €
            </span>
          </div>
        </div>
      )}
    </div>
  );
}