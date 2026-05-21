import React from 'react';

export const FormSelect = ({ label, name, options }: { label: string, name: string, options: { value: string, label: string }[] }) => {
  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs uppercase tracking-widest font-bold opacity-70">{label}</label>
      <select 
        name={name}
        className="w-full bg-cream/10 border border-cream/20 rounded-custom p-5 text-cream focus:outline-none focus:border-burgundy appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="text-navy">{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
