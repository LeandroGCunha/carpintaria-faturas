import React from 'react';

export default function Input({ 
  label,          // 1. O texto por cima do input (ex: "Nome do Cliente")
  error,          // 2. Mensagem de erro a vermelho (opcional)
  className = '', // 3. Classes Tailwind extras por fora
  ...props        // 4. type, value, onChange, placeholder, etc.
}) {
  return (
    <div className="w-full">
      {/* Se passámos a propriedade label, desenha o rótulo estilizado */}
      {label && (
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}

      {/* O campo de texto real */}
      <input
        className={`w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          error ? 'border-rose-500 focus:ring-rose-100' : ''
        } ${className}`}
        {...props}
      />

      {/* Se houver mensagem de erro, mostra-a a vermelho por baixo */}
      {error && (
        <p className="text-xs text-rose-500 mt-1 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}