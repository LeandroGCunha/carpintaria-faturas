import React from 'react';

export default function Card({ 
  title,            // Título do cabeçalho da caixa (opcional)
  action,           // Botão ou ação no canto superior direito (opcional)
  children,         // Todo o conteúdo que meteres dentro da caixa
  className = ''    // Classes extras se quiseres ajustar margens
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4 ${className}`}>
      {/* Se passarmos um título ou um botão de ação, desenha o cabeçalho */}
      {(title || action) && (
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          {title && (
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}

      {/* O recheio da caixa */}
      <div>{children}</div>
    </div>
  );
}