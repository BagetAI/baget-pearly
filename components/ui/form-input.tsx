import React from 'react';

export const FormInput = ({ label, name, type = "text", required = false, placeholder }: { label: string, name: string, type?: string, required?: boolean, placeholder?: string }) => {
  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs uppercase tracking-widest font-bold opacity-70">{label}</label>
      <input 
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-cream/10 border border-cream/20 rounded-custom p-5 text-cream focus:outline-none focus:border-burgundy transition-colors"
      />
    </div>
  );
};
