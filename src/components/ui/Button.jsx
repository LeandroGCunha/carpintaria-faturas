import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon, 
  className = '', 
  ...props 
}) {
  const base = "inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    secondary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
    outline: "border border-slate-300 hover:bg-slate-50 text-slate-700",
    ghost: "text-slate-600 hover:bg-slate-100"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}