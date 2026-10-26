import Card from "../../ui/Card";
import Input from "../../ui/Input";
import { TAGS_SUGERIDAS } from "../../../constants/constants";

export default function DocumentInfo({ dados, onAtualizar }) {
  const tagsSelecionadas = Array.isArray(dados.tags) ? dados.tags : [];

  const alternarTag = (tag) => {
    const novasTags = tagsSelecionadas.includes(tag)
      ? tagsSelecionadas.filter((tagSelecionada) => tagSelecionada !== tag)
      : [...tagsSelecionadas, tag];

    onAtualizar("tags", novasTags);
  };

  return (
    <Card title="Dados do Orçamento">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Nº Orçamento"
          value={dados.numero}
          onChange={(e) => onAtualizar("numero", e.target.value)}
          placeholder="ORC-2026/01"
        />
        <Input
          label="Data"
          type="date"
          value={dados.data}
          onChange={(e) => onAtualizar("data", e.target.value)}
        />
        <Input
          label="Validade (Dias)"
          type="number"
          min="1"
          value={dados.validadeDias}
          onChange={(e) => onAtualizar("validadeDias", Number(e.target.value))}
        />
      </div>

      <div className="mt-4">
        <span className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Tags
        </span>
        <div className="flex flex-wrap gap-2">
          {TAGS_SUGERIDAS.map((tag) => {
            const selecionada = tagsSelecionadas.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selecionada}
                onClick={() => alternarTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  selecionada
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
