import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-8 py-3 font-bold uppercase tracking-widest transition-all rounded-custom paper-shadow",
        variant === 'primary' ? "bg-burgundy text-cream hover:bg-navy" : "bg-navy text-cream hover:bg-burgundy",
        className
      )}
      {...props}
    />
  );
};
