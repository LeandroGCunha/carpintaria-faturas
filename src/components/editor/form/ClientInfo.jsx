import React from 'react';
import Card from '../../ui/Card';
import Input from '../../ui/Input';

export default function ClientInfo({ dados, onAtualizar }) {
  return (
    <Card title="Dados do Cliente">
      <div className="space-y-3">
        <Input
          label="Nome do Cliente / Empresa"
          value={dados.clienteNome}
          onChange={(e) => onAtualizar('clienteNome', e.target.value)}
          placeholder="Ex: João Ferreira"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="NIF"
            value={dados.clienteNif}
            onChange={(e) => onAtualizar('clienteNif', e.target.value)}
            placeholder="Ex: 123456789"
          />
          <Input
            label="Contacto Telefónico"
            value={dados.clienteTelefone}
            onChange={(e) => onAtualizar('clienteTelefone', e.target.value)}
            placeholder="Ex: 912 345 678"
          />
        </div>

        <Input
          label="Morada da Obra / Instalação"
          value={dados.clienteMorada}
          onChange={(e) => onAtualizar('clienteMorada', e.target.value)}
          placeholder="Ex: Rua das Flores nº 12, Coimbra"
        />
      </div>
    </Card>
  );
}