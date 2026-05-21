import React from 'react';
import { Container } from './container';

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-burgundy/10 py-12">
      <Container className="text-center text-navy/60 text-sm tracking-widest uppercase font-bold">
        <p>&copy; {new Date().getFullYear()} Pearly Software Inc. Built for Independent Dental Practices.</p>
      </Container>
    </footer>
  );
};
