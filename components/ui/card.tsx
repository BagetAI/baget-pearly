import React from 'react';

export const Card = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="border-b border-burgundy/10 pb-6 md:pb-0 md:border-b-0 text-center md:text-left">
      <h3 className="text-xl font-serif font-bold text-burgundy mb-4 uppercase tracking-wide border-b border-burgundy/10 pb-2 inline-block md:block">
        {title}
      </h3>
      <p className="text-navy/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
