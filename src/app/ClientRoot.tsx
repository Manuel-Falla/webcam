'use client';

import React from 'react';
import ClientLayout from './ClientLayout';
import { FiltersProvider } from '../contexts/filtersContext';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <FiltersProvider>
      <ClientLayout>{children}</ClientLayout>
    </FiltersProvider>
  );
}