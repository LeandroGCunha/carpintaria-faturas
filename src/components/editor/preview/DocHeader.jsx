import React from "react";
import logoCarpingomes from "../../../assets/logo-carpingomes.svg";
import { formatarDataPT } from "../../../utils/formatters";

export default function DocHeader({ orcamento }) {
  const temCliente = orcamento.clienteNome?.trim();

  return (
    <div className="border-b-2 border-slate-900 pb-5 mb-6">
      {/* 1. TOPO: Logótipo à esquerda e Metadados do Orçamento à direita */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <img
            src={logoCarpingomes}
            alt="Carpingomes - Carpintaria, Lda."
            className="w-60 sm:w-68 h-auto object-contain -ml-2"
          />
        </div>

        <div className="text-right shrink-0">
          <span className="inline-block bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded tracking-wider uppercase mb-1.5">
            Orçamento
          </span>
          <p className="text-sm font-extrabold text-slate-900 font-mono">
            {orcamento.numero || "ORC-XXXX"}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Data:{" "}
            <span className="font-semibold text-slate-700">
              {formatarDataPT(orcamento.data)}
            </span>
          </p>
          <p className="text-xs text-slate-500">
            Validade:{" "}
            <span className="font-semibold text-slate-700">
              {orcamento.validadeDias} dias
            </span>
          </p>
        </div>
      </div>

      {/* 2. DADOS EMPARELHADOS: Empresa à esquerda VS Cliente à direita */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] leading-relaxed">
        {/* Linha 1: Especialidade / Identificação vs Nome do Cliente */}
        <div className="grid grid-cols-12 gap-4 items-baseline min-h-[1.5rem]">
          <div className="col-span-6 font-semibold text-slate-800">
            Carpintaria Geral
          </div>
          <div className="col-span-6 text-right">
            {temCliente && (
              <p className="text-xs font-bold text-slate-900">
                <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
                  Exmo.(a) Sr.(a):
                </span>
                {orcamento.clienteNome}
              </p>
            )}
          </div>
        </div>

        {/* Linha 2: Morada da Sede vs Morada da Obra */}
        <div className="grid grid-cols-12 gap-4 items-baseline min-h-[1.5rem]">
          <div className="col-span-6 text-slate-600">
            Viso — 4540-586 São Miguel do Mato (Arouca)
          </div>
          <div className="col-span-6 text-right text-slate-700">
            {temCliente && orcamento.clienteMorada?.trim() && (
              <p>
                <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
                  Local da Obra:
                </span>
                {orcamento.clienteMorada}
              </p>
            )}
          </div>
        </div>

        {/* Linha 3: Contacto da Empresa vs Contacto do Cliente */}
        <div className="grid grid-cols-12 gap-4 items-baseline min-h-[1.5rem]">
          <div className="col-span-6 text-slate-600">
            Contacto: 933408983 | carpingomes@hotmail.com
          </div>
          <div className="col-span-6 text-right text-slate-600">
            {temCliente && orcamento.clienteTelefone?.trim() && (
              <p>
                <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
                  Contacto:
                </span>
                {orcamento.clienteTelefone}
              </p>
            )}
          </div>
        </div>

        {/* Linha 4: NIF da Empresa vs NIF do Cliente */}
        <div className="grid grid-cols-12 gap-4 items-baseline min-h-[1.5rem]">
          <div className="col-span-6 font-mono text-slate-700">
            NIF: 505 947 757
          </div>
          <div className="col-span-6 text-right font-mono text-slate-700">
            {temCliente && orcamento.clienteNif?.trim() && (
              <p>
                <span className="text-slate-400 font-sans font-semibold uppercase text-[10px] mr-1">
                  NIF:
                </span>
                {orcamento.clienteNif}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
