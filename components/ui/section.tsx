import React from 'react';
import { cn } from '@/lib/utils';

export const Section = ({ id, children, className }: { id?: string, children: React.ReactNode, className?: string }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
};
