'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Definir el tipo de contexto
interface FiltersContextType {
  filter: string;
  selectedCategory: string;
  searchQuery: string;
  resetFilters: () => void;
  setFilter: (filter: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

// Crear el contexto con valores por defecto
const FiltersContext = createContext<FiltersContextType>({
  filter: 'online',
  selectedCategory: 'Todas',
  searchQuery: '',
  resetFilters: () => {},
  setFilter: () => {},
  setSelectedCategory: () => {},
  setSearchQuery: () => {},
});

// Hook personalizado para acceder al contexto
export const useFilters = () => useContext(FiltersContext);

// Proveedor de contexto
export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [filter, setFilter] = useState('online');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Función para resetear los filtros
  const resetFilters = useCallback(() => {
    setFilter('online');
    setSelectedCategory('Todas');
    setSearchQuery('');
    
    // Eliminar cualquier parámetro de búsqueda sin recargar
    router.push('/');
  }, [router]);

  // Valores que se proveerán a través del contexto
  const contextValue = {
    filter,
    selectedCategory,
    searchQuery,
    resetFilters,
    setFilter,
    setSelectedCategory,
    setSearchQuery,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};