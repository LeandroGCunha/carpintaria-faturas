import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import ItemRow from './ItemRow';
import { Plus } from 'lucide-react';

export default function LineItems({ linhas, onAdicionarLinha, onAtualizarLinha, onRemoverLinha }) {
  return (
    <Card
      title="Trabalhos & Artigos"
      action={
        <Button variant="outline" icon={Plus} onClick={onAdicionarLinha} type="button">
          Adicionar Linha
        </Button>
      }
    >
      <div className="space-y-3">
        {linhas.map((linha, index) => (
          <ItemRow
            key={linha.id}
            linha={linha}
            index={index}
            podeRemover={linhas.length > 1}
            onAtualizar={onAtualizarLinha}
            onRemover={onRemoverLinha}
          />
        ))}
      </div>
    </Card>
  );
}