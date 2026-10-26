import React from "react";

export default function DocTable({ itens }) {
  return (
    <div className="min-h-[280px]">
      <table className="invoice-table w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-300 text-slate-500 uppercase tracking-wider font-bold">
            <th className="py-2 w-8 text-center">#</th>
            <th className="py-2">Descrição dos Trabalhos</th>
            <th className="py-2 text-center w-20">Qtd</th>
            <th className="py-2 text-right w-24">P. Unitário</th>
            <th className="py-2 text-right w-24">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {itens.map((item, idx) => (
            <tr key={item.id || idx}>
              <td className="py-2.5 text-center text-slate-400 font-medium">
                {idx + 1}
              </td>
              <td className="py-2.5 pr-4">
                <p className="font-semibold text-slate-900">
                  {item.descricao || "(Sem descrição)"}
                </p>
                {item.modo === "fixo" && (
                  <span className="text-[10px] text-slate-400 italic">
                    Trabalho por medida / Preço global
                  </span>
                )}
              </td>
              <td className="py-2.5 text-center">
                {item.modo === "qtd" ? item.qtd : "—"}
              </td>
              <td className="py-2.5 text-right font-mono">
                {item.modo === "qtd"
                  ? `${Number(item.precoUnit || 0).toFixed(2)} €`
                  : "—"}
              </td>
              <td className="py-2.5 text-right font-bold text-slate-900 font-mono">
                {Number(item.valor || 0).toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
