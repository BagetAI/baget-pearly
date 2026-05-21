import React from 'react';

export const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-widest font-bold opacity-70">{label}</label>
      <input 
        className="w-full bg-cream/10 border border-cream/20 rounded-custom p-4 text-cream focus:outline-none focus:border-burgundy transition-colors"
        {...props}
      />
    </div>
  );
};
