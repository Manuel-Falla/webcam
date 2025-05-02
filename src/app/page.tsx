'use client';

import React, { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFilters } from '../contexts/filtersContext';
import {
  Home as HomeIcon, MessageCircle, ThumbsUp, Heart, User, Clock
} from 'lucide-react';

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
      isMobile: false
    });

    useEffect(() => {
      if (typeof window === 'undefined') return;
      function handleResize() {
        const width = window.innerWidth;
        const isMobile = width < 768;
        setWindowSize({ width, isMobile });
      }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  }

interface Model {
  id: number;
  username: string;
  isOnline: boolean;
  thumbnail: string;
  tags: string[];
  viewers: number;
}

// Datos temporales para pruebas
const MOCK_MODELS: Model[] = [
  {
    id: 1,
    username: "Sofia_charm",
    isOnline: true,
    thumbnail: "/images/modelo1.jpeg",
    tags: ["latina", "dance", "new"],
    viewers: 245
  },
  {
    id: 2,
    username: "Natalia_hot",
    isOnline: true,
    thumbnail: "/images/modelo2.jpeg",
    tags: ["blonde", "toy", "18+"],
    viewers: 532
  },
  {
    id: 3,
    username: "Victoria_sexy",
    isOnline: false,
    thumbnail: "/images/modelo3.jpeg",
    tags: ["brunette", "dance", "mature"],
    viewers: 0
  },
  {
    id: 4,
    username: "Laura_kiss",
    isOnline: true,
    thumbnail: "/images/modelo4.jpeg",
    tags: ["redhead", "cosplay", "fetish"],
    viewers: 189
  },
  {
    id: 5,
    username: "Ana_sweet",
    isOnline: true,
    thumbnail: "/images/modelo5.jpeg",
    tags: ["petite", "teen", "shy"],
    viewers: 321
  },
  {
    id: 6,
    username: "Maria_hot",
    isOnline: false,
    thumbnail: "/images/modelo6.jpg",
    tags: ["curvy", "mature", "roleplay"],
    viewers: 0
  },
  {
    id: 7,
    username: "Sofia_charm",
    isOnline: true,
    thumbnail: "/images/modelo1.jpeg",
    tags: ["latina", "dance", "new"],
    viewers: 245
  },
  {
    id: 8,
    username: "Natalia_hot",
    isOnline: true,
    thumbnail: "/images/modelo2.jpeg",
    tags: ["blonde", "toy", "18+"],
    viewers: 532
  },
  {
    id: 9,
    username: "Victoria_sexy",
    isOnline: false,
    thumbnail: "/images/modelo3.jpeg",
    tags: ["brunette", "dance", "mature"],
    viewers: 0
  },
  {
    id: 10,
    username: "Laura_kiss",
    isOnline: true,
    thumbnail: "/images/modelo4.jpeg",
    tags: ["redhead", "cosplay", "fetish"],
    viewers: 189
  },
  {
    id: 11,
    username: "Ana_sweet",
    isOnline: true,
    thumbnail: "/images/modelo5.jpeg",
    tags: ["petite", "teen", "shy"],
    viewers: 321
  },
  {
    id: 12,
    username: "Maria_hot",
    isOnline: false,
    thumbnail: "/images/modelo6.jpg",
    tags: ["curvy", "mature", "roleplay"],
    viewers: 0
  },
  {
    id: 13,
    username: "Sofia_charm",
    isOnline: true,
    thumbnail: "/images/modelo1.jpeg",
    tags: ["latina", "dance", "new"],
    viewers: 245
  },
  {
    id: 14,
    username: "Natalia_hot",
    isOnline: true,
    thumbnail: "/images/modelo2.jpeg",
    tags: ["blonde", "toy", "18+"],
    viewers: 532
  },
  {
    id: 15,
    username: "Victoria_sexy",
    isOnline: false,
    thumbnail: "/images/modelo3.jpeg",
    tags: ["brunette", "dance", "mature"],
    viewers: 0
  },
  {
    id: 16,
    username: "Laura_kiss",
    isOnline: true,
    thumbnail: "/images/modelo4.jpeg",
    tags: ["redhead", "cosplay", "fetish"],
    viewers: 189
  },
  {
    id: 17,
    username: "Ana_sweet",
    isOnline: true,
    thumbnail: "/images/modelo5.jpeg",
    tags: ["petite", "teen", "shy"],
    viewers: 321
  },
  {
    id: 18,
    username: "Maria_hot",
    isOnline: false,
    thumbnail: "/images/modelo6.jpg",
    tags: ["curvy", "mature", "roleplay"],
    viewers: 0
  }
];

const CATEGORIES = [
  "Todas", "En Línea", "Latinas", "Asiáticas", "Maduras",
  "Teen", "Fetiche", "MILF", "Trans", "Parejas"
];

export default function Home() {
  const pathname = usePathname();
  const { width, isMobile } = useWindowSize();
  const {
    filter, selectedCategory, searchQuery,
    resetFilters, setFilter, setSelectedCategory
  } = useFilters();

  const [models, setModels] = useState(MOCK_MODELS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const shouldBeOpen = window.innerWidth >= 768;
      setIsSidebarOpen(shouldBeOpen);
      setIsReady(true);
    }
  }, []);

  const MENU_ITEMS = [
    { icon: HomeIcon, label: "Inicio", action: resetFilters, highlight: true },
    { icon: MessageCircle, label: "Publicaciones", link: "/Publicaciones", highlight: false },
    { icon: ThumbsUp, label: "Recomendado", link: "/recomendado", highlight: false },
    { icon: Heart, label: "Mis Favoritos", link: "/misFavoritos", highlight: false },
    { icon: User, label: "Mejores Privados", link: "/mejoresPrivados", highlight: false },
    { icon: Clock, label: "Historial", link: "/historial", highlight: false },
  ];

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const searchCondition = searchQuery.trim() === '' ||
        model.username.toLowerCase().includes(searchQuery.toLowerCase());
      const onlineCondition = filter === "online" ? model.isOnline : true;
      const categoryCondition = selectedCategory === "Todas" ||
        model.tags.some(tag =>
          tag.toLowerCase() === selectedCategory.toLowerCase() ||
          tag.toLowerCase() === selectedCategory.toLowerCase().slice(0, -1)
        );
      return searchCondition && onlineCondition && categoryCondition;
    });
  }, [models, searchQuery, filter, selectedCategory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      const isOpen = customEvent.detail?.isOpen;
      if (typeof isOpen === 'boolean') setIsSidebarOpen(isOpen);
    };
    window.addEventListener('sidebarToggle', handleSidebarToggle);
    return () => window.removeEventListener('sidebarToggle', handleSidebarToggle);
  }, []);

  const toggleSidebar = () => {
    if (typeof window === 'undefined') return;
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    const event = new CustomEvent('sidebarToggle', { detail: { isOpen: newState } });
    window.dispatchEvent(event);
  };


  return (
    <>
      {isReady && (
        <>
          {/* Aquí va TODO tu JSX del menú lateral y el resto de la interfaz sin cambios */}
          <div
        className={`
          fixed bg-gradient-to-b from-gray-900 to-gray-900 
          transition-all duration-100 ease-in-out overflow-x-hidden
          ${isSidebarOpen ? 'w-52 md:w-55' : 'w-14 md:w-16'}
          z-50 md:z-20
        `}
        style={{
          top: "90px",
          bottom: "44px",
          left: 0,
          overflowY: "auto",
          scrollbarWidth: 'thin',
          scrollbarColor: '#333333 #1a1a1a',
          display: isSidebarOpen ? 'block' : (isMobile ? 'none' : 'block')
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 4px;
          }
          div::-webkit-scrollbar-track {
            background: #1a1a1a;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #333333;
            border-radius: 6px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #555555;
          }
        `}</style>

        {isSidebarOpen ? (
          <div className="pt-1 px-1 pb-8">
            <div className="mb-2 bg-pink-700 rounded-md p-3 md:p-0 flex items-center">
              <div className="mr-4 md:mr-2">
                <img
                  src="/images/menu/Promociones.png"
                  alt="Promociones"
                  width="35"
                  height="35"
                  className="object-contain w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              <div>
                <span className="text-white text-sm md:text-lg font-medium block leading-tight">Promociones</span>
                <span className="text-white text-sm md:text-lg font-medium block leading-tight">Irresistibles</span>
              </div>
            </div>

            {/* Menú principal */}
            <nav>
              <ul className="space-y-1">
                {MENU_ITEMS.map((item) => (
                  <li key={item.label}>
                    {item.label === "Inicio" ? (
                      <button
                        onClick={item.action}
                        className={`
                          flex items-center px-2 md:px-3 py-2 rounded-md transition-colors w-full text-left
                          ${item.highlight ? 'text-pink-700' : 'text-white'}
                          hover:bg-gray-800
                        `}
                      >
                        <item.icon size={18} className="mr-2 md:mr-2" />
                        <span className="font-medium text-xs md:text-sm">{item.label}</span>
                      </button>
                    ) : (
                      <Link
                        href={item.link || "#"}
                        className={`
                          flex items-center px-2 md:px-3 py-1 rounded-md transition-colors
                          ${item.highlight ? 'text-pink-700' : 'text-white'}
                          hover:bg-gray-800
                        `}
                      >
                        <item.icon size={18} className="mr-2 md:mr-2" />
                        <span className="font-medium text-xs md:text-sm">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Separador */}
            <div className="border-t border-gray-800 my-3 md:my-4"></div>

            {/* Nuevas secciones de filtros */}
            <div className="px-2 md:px-3">
              {/* Sección de Edades */}
              <div className="mb-3">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Edades</h3>
                <div className="space-y-1">
                  {["18-22", "23-28", "29-35", "36-45", "46+"].map((edad) => (
                    <button
                      key={edad}
                      onClick={() => {
                        setSelectedCategory(edad);
                      }}
                      className="block w-full text-left px-2 py-1 rounded-md text-gray-300 hover:bg-gray-800 text-xs md:text-sm"
                    >
                      {edad} años
                    </button>
                  ))}
                </div>
              </div>

              {/* Sección de Etnias */}
              <div className="mb-3">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Etnias</h3>
                <div className="space-y-1">
                  {["Latina", "Europea", "Asiática", "Afroamericana", "Árabe", "India"].map((etnia) => (
                    <button
                      key={etnia}
                      onClick={() => {
                        setSelectedCategory(etnia);
                      }}
                      className="block w-full text-left px-2 py-1 rounded-md text-gray-300 hover:bg-gray-800 text-xs md:text-sm"
                    >
                      {etnia}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sección de Tipo de Cuerpo */}
              <div className="mb-3">
                <h3 className="text-white font-bold mb-2 text-sm md:text-base">Tipo de Cuerpo</h3>
                <div className="space-y-1">
                  {["Delgada", "Curvy", "Atlética", "Musculosa", "Voluptuosa", "Fit"].map((cuerpo) => (
                    <button
                      key={cuerpo}
                      onClick={() => {
                        setSelectedCategory(cuerpo);
                      }}
                      className="block w-full text-left px-2 py-1 rounded-md text-gray-300 hover:bg-gray-800 text-xs md:text-sm"
                    >
                      {cuerpo}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sidebar colapsado - solo iconos */
          <div className="h-full flex flex-col py-4 bg-gray-950">
            <div className="mb-6 mx-auto rounded-md p-2 md:p-3 bg-pink-700">
              <img
                src="/images/menu/Promociones.png"
                alt="Promociones"
                width="20"
                height="20"
                className="object-contain w-6 h-6 md:w-8 md:h-8"
              />
            </div>

            {/* Iconos principales */}
            <div className="flex flex-col items-center space-y-3 md:space-y-4">
              {MENU_ITEMS.map((item, index) => (
                item.label === "Inicio" ? (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`
                      w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
                      ${item.highlight ? 'text-pink-700' : 'text-white'} 
                      hover:text-purple-700 transition-colors
                    `}
                  >
                    <item.icon size={18} className="md:w-5 md:h-5" />
                  </button>
                ) : (
                  <div className="relative group" key={index}>
                    <Link
                      href={item.link || "#"}
                      className={`
                        w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
                        ${item.highlight ? 'text-pink-700' : 'text-white'} 
                        hover:text-purple-700 transition-colors
                      `}
                    >
                      <item.icon size={18} className="md:w-5 md:h-5" />
                    </Link>
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {item.label}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenido principal - con margen izquierdo para el menú */}
      <div
        className="bg-black overflow-y-auto"
        style={{
          position: "fixed",
          top: "90px",
          bottom: "44px",
          right: 0,
          // En móviles, ocupa todo el ancho cuando el menú está cerrado
          left: !isMobile ? (isSidebarOpen ? "208px" : "56px") : "0px",
          transition: "left 0.3s ease-in-out"
        }}
      >
        {/* Capa de desenfoque solo en móvil cuando el menú está abierto */}
        {isSidebarOpen && isMobile && (
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <section className="w-full px-2 md:px-4 pt-0">
          {/* Encabezado y filtros */}
          <div className="mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-pink-700">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : "Mas Populares"}
            </h1>
            <div className="flex gap-1 md:gap-2">
              <button
                onClick={() => {
                  setFilter("online");
                  setSelectedCategory("En Línea");
                }}
                className={`px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${filter === "online" ? "bg-pink-700 text-white" : "bg-gray-700 text-gray-200"}`}
              >
                En línea
              </button>
              <button
                onClick={() => {
                  setFilter("all");
                  setSelectedCategory("Todas");
                }}
                className={`px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${filter === "all" ? "bg-pink-700 text-white" : "bg-gray-700 text-gray-200"}`}
              >
                Todos
              </button>
            </div>
          </div>

          {/* Mensaje de resultados de búsqueda */}
          {searchQuery && (
            <div className="mb-2 md:mb-3 mx-auto">
              <p className="text-gray-300 text-xs md:text-sm">
                {filteredModels.length === 0
                  ? `No se encontraron modelos para "${searchQuery}"`
                  : `Se encontraron ${filteredModels.length} modelo(s) para "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Grid de modelos */}
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {filteredModels.map(model => (
                <Link
                  key={model.id}
                  href={`/model/${model.id}`}
                  className="block group cursor-pointer"
                >
                  <div className="relative rounded-lg overflow-hidden transition-all hover:shadow-lg bg-gray-900 border border-black hover:border-pink-700">
                    <div className="aspect-[5/4] relative">
                      <img
                        src={model.thumbnail}
                        alt={model.username}
                        className="w-full h-full object-cover rounded-t-lg"
                      />

                      {model.isOnline && (
                        <div className="absolute top-1 left-1 bg-red-600 text-white px-1 py-0.5 rounded-full text-[8px] md:text-[10px] leading-none">
                          EN VIVO
                        </div>
                      )}
                    </div>

                    <div className="p-1 md:p-2">
                      <h3 className="font-semibold text-xs md:text-sm truncate text-white">{model.username}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-4 md:p-8 text-center shadow border border-gray-950 mx-auto">
              <h2 className="text-lg md:text-xl font-semibold text-pink-700 mb-2">No se encontraron modelos</h2>
              <p className="text-gray-300 text-sm">Intenta con otra búsqueda o categoría</p>
            </div>
          )}
        </section>
        {/* Footer - Agregado aquí para que quede dentro del contenedor principal */}
        <footer className="bg-gray-950 text-white py-4 md:py-6 mt-6">
          <div className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-pink-700">Afrodita</h3>
                <p className="text-gray-300 text-xs md:text-sm">La mejor plataforma de modelos webcam en Latinoamérica.</p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-pink-700">Enlaces</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <li><Link href="/about" className="text-gray-300 hover:text-purple-700">Acerca de</Link></li>
                  <li><Link href="/terms" className="text-gray-300 hover:text-purple-700">Términos y condiciones</Link></li>
                  <li><Link href="/privacy" className="text-gray-300 hover:text-purple-700">Política de privacidad</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-pink-700">Contacto</h3>
                <p className="text-gray-300 text-xs md:text-sm">soporte@afrodita.com</p>
              </div>
            </div>
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-pink-700 text-center text-gray-300 text-xs md:text-sm">
              <p>&copy; {new Date().getFullYear()} Afrodita. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Banner de registro fijo en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-950 to-pink-950 py-1 px-4 shadow-lg z-50 hidden md:block">
        <div className="mx-auto flex flex-row justify-center items-center gap-4">
          <p className="text-white font-medium text-lg md:text-2xl text-center">
            ¿Quieres convertirte en modelo?
          </p>
          <Link
            href="/register"
            className="bg-gray-300 text-pink-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors text-sm"
          >
            Regístrate Gratis
          </Link>
        </div>
      </div>
        </>
      )}
    </>
  );
}

