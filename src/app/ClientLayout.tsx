'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Bell, User, Home as HomeIcon, ThumbsUp, Heart, MessageCircle, Clock, Zap } from 'lucide-react';
import LoginModal from '../components/loginModal';
import RegisterModal from '../components/registerModal';
import PasswordRecoveryModal from '../components/passwordRecoveryModal';
import { useFilters } from '../contexts/filtersContext';

// Hook personalizado para manejar el tamaño de ventana con soporte SSR
function useWindowSize() {
  // Valores predeterminados durante SSR (desktop)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: false
  });
  
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;
    
    function handleResize() {
      const width = window.innerWidth;
      const isMobile = width < 768;
      
      setWindowSize({
        width,
        isMobile
      });
    }
    
    // Inicializar
    handleResize();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    // Limpiar
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile, width } = useWindowSize();

  // Acceder al contexto de filtros
  const { resetFilters, searchQuery, setSearchQuery } = useFilters();

  // Estado para los modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);

  // Obtener el valor de búsqueda del contexto
  const [searchValue, setSearchValue] = useState(searchQuery);

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("Mujeres");

  // Inicialización del estado del sidebar con lógica separada para móvil/desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') {
      // Durante SSR, devuelve true (comportamiento predeterminado de escritorio)
      return true;
    }
    
    // Durante la hidratación del cliente, verifica inmediatamente el tamaño de la pantalla
    return window.innerWidth >= 768;
  });
  
  // Aplica el estado inicial correcto inmediatamente después de la hidratación
  useEffect(() => {
    const initSidebar = () => {
      setIsSidebarOpen(!isMobile);
    };
    
    // Usa requestAnimationFrame para asegurar que esto se ejecute lo antes posible después de la hidratación
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(initSidebar);
    }
  }, [isMobile]);

  // Actualizar searchValue cuando searchQuery cambia
  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  // Función para ir a la página principal con reinicio de filtros
  const goToHome = () => {
    resetFilters();
  };

  // Función para alternar el sidebar
  const toggleSidebar = () => {
    if (typeof window === 'undefined') return;
    
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);

    // Emitir evento personalizado para informar a otros componentes
    const event = new CustomEvent('sidebarToggle', { detail: { isOpen: newState } });
    window.dispatchEvent(event);
  };

  // Manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };

  // Función para cambiar entre modales
  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsRecoveryModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRecoveryModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToRecovery = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsRecoveryModalOpen(true);
  };

  // Categorías para la barra gris
  const categories = [
    { name: "Mujeres" },
    { name: "Hombres" },
    { name: "Parejas" },
    { name: "Trans" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar - barra superior morada */}
      <header className="bg-gradient-to-r from-purple-950 to-pink-950 text-white shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="w-full px-2 py-0">
          <div className="flex justify-between items-center">
            {/* Contenedor de hamburguesa y logo */}
            <div className="flex items-center">
              {/* Botón hamburguesa integrado en el header */}
              <button
                onClick={toggleSidebar}
                className="text-white p-1 mr-3 hover:bg-white/10 rounded-md transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <button
                onClick={goToHome}
                className="text-xl md:text-2xl font-bold hover:text-white/80 transition-colors cursor-pointer truncate max-w-[100px] md:max-w-none"
              >
                Afrodita
              </button>
            </div>

            {/* NUEVAS OPCIONES - Ocultas en móvil, visibles en tablet/desktop */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-10 px-2 lg:px-6 text-sm font-medium">
              {/* EN VIVO */}
              <Link
                href="/live"
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                <div className="text-white leading-tight font-bold text-base">
                  <span className="block">7335</span>
                  <span className="font-normal text-sm block">EN VIVO</span>
                </div>
              </Link>

              {/* Modelos en la Cima */}
              <Link
                href="/featured"
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">👑</span>
                <span className="text-white text-xs lg:text-sm leading-tight text-left">
                  Modelos<br />en la cima
                </span>
              </Link>

              {/* Quienes Somos */}
              <Link
                href="/about"
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">❔</span>
                <span className="text-white text-xs lg:text-sm leading-tight text-left">
                  Quienes<br />somos
                </span>
              </Link>
            </div>

            {/* Buscador - Responsive */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[150px] sm:max-w-xs md:max-w-md mx-2 md:mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-2 px-2 pr-8 md:px-4 md:pr-10 rounded-full text-gray-300 bg-gray-900 focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-pink-700 text-xs md:text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-2 md:px-3 text-gray-300 flex items-center"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Botones de acción - Responsive */}
            <div className="flex items-center space-x-1 md:space-x-2 ml-2 md:ml-10">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-gray-300 text-pink-700 px-2 py-2 rounded-full font-medium hover:bg-gray-400 transition-colors text-xs md:text-sm"
              >
                Iniciar Sesion
              </button>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-pink-700 text-white px-2 py-2 rounded-full hover:bg-pink-800 transition-colors text-xs md:text-sm"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de categorías gris - con altura fija */}
      <div className="bg-gray-900 text-white shadow-md fixed left-0 right-0 z-30" style={{ top: '56px', height: '34px' }}>
        <div className="container mx-auto px-4">
          <div
            className="flex justify-center md:justify-start items-center h-full overflow-x-auto"
            style={{ paddingTop: '0.55rem', paddingBottom: '0.35rem' }}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  flex items-center gap-1 px-2 md:px-2 py-0 mx-0 rounded-lg 
                  transition-colors 
                  ${selectedCategory === category.name
                    ? 'bg-pink-700 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                  }
                `}
              >
                <span className="text-xs md:text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main
        className="flex-1 pb-0 bg-black overflow-y-auto"
        style={{
          paddingTop: '0.133rem',
          height: 'calc(100vh - 56px - 36px)', // Resta altura del header y barra de categorías
          position: 'relative'
        }}
      >
        {children}
      </main>

      {/* Modales de login, registro y recuperación de contraseña */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={switchToRegister}
        onSwitchToRecovery={switchToRecovery}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={switchToLogin}
      />

      <PasswordRecoveryModal
        isOpen={isRecoveryModalOpen}
        onClose={() => setIsRecoveryModalOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
}