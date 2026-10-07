import React from 'react';
import Card from '../../ui/Card';
import Input from '../../ui/Input';

export default function DocumentInfo({ dados, onAtualizar }) {
  return (
    <Card title="Dados do Orçamento">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Nº Orçamento"
          value={dados.numero}
          onChange={(e) => onAtualizar('numero', e.target.value)}
          placeholder="ORC-2026/01"
        />
        <Input
          label="Data"
          type="date"
          value={dados.data}
          onChange={(e) => onAtualizar('data', e.target.value)}
        />
        <Input
          label="Validade (Dias)"
          type="number"
          min="1"
          value={dados.validadeDias}
          onChange={(e) => onAtualizar('validadeDias', Number(e.target.value))}
        />
      </div>
    </Card>
  );
}