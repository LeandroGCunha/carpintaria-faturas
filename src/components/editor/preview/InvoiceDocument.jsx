import React from 'react';
import DocHeader from './DocHeader';
import DocTable from './DocTable';
import DocSummary from './DocSummary';

export default function InvoiceDocument({ orcamento, subtotal }) {
  return (
    <div className="invoice-document bg-white p-8 sm:p-12 shadow-xl rounded-lg border border-slate-200 w-full max-w-[210mm] min-h-[297mm] flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:px-8 print:pt-[3mm] print:pb-8">
      <div>
        <DocHeader orcamento={orcamento} />
        <DocTable itens={orcamento.itens} />
      </div>

      <DocSummary
        subtotal={subtotal}
        aplicarIva={orcamento.aplicarIva}
        taxaIva={orcamento.taxaIva}
        observacoes={orcamento.observacoes}
      />
    </div>
  );
}