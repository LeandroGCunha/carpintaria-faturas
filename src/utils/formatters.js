export function formatarDataPT(dataStr) {
  if (!dataStr) return "—";
  // dataStr chega como "2026-10-05"
  const partes = dataStr.split("-");
  if (partes.length !== 3) return dataStr;

  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}
