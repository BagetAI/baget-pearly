import React from 'react';
import { Container } from './container';

export const Navbar = () => {
  return (
    <nav className="border-b border-burgundy/20 py-6">
      <Container className="flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-burgundy tracking-tight">
          PEARLY
        </div>
        <div className="hidden md:flex space-x-12 text-xs font-bold uppercase tracking-[0.2em] text-navy">
          <a href="#features" className="hover:text-burgundy transition-colors">Features</a>
          <a href="#waitlist" className="hover:text-burgundy transition-colors">Join Beta</a>
        </div>
      </Container>
    </nav>
  );
};
