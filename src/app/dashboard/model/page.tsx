// src/app/dashboard/model/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Datos de prueba para el dashboard
const MODEL_STATS = {
  username: "Sofia_charm",
  earnings: {
    today: 120,
    thisWeek: 850,
    thisMonth: 3200,
    pending: 750
  },
  viewerStats: {
    online: 15,
    totalToday: 245,
    followers: 1250,
    newFollowers: 8
  },
  streamHistory: [
    { date: '2023-04-10', duration: '2h 15m', viewers: 230, earnings: 180 },
    { date: '2023-04-09', duration: '3h 20m', viewers: 310, earnings: 240 },
    { date: '2023-04-07', duration: '1h 45m', viewers: 180, earnings: 120 },
    { date: '2023-04-05', duration: '2h 30m', viewers: 250, earnings: 195 },
  ]
};

export default function ModelDashboard() {
  const [isLive, setIsLive] = useState(false);
  const [stats, setStats] = useState(MODEL_STATS);
  
  // Simulación de iniciar/detener transmisión
  const toggleStream = () => {
    setIsLive(!isLive);
    // Aquí iría la lógica para iniciar/detener la transmisión real
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Modelo</h1>
        <button
          onClick={toggleStream}
          className={`px-6 py-3 rounded-full font-semibold ${
            isLive 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isLive ? 'Finalizar Transmisión' : 'Iniciar Transmisión'}
        </button>
      </div>
      
      {isLive && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <div>
            <span className="font-bold">¡En vivo ahora!</span>
            <p>Tu transmisión está activa y los usuarios pueden verte.</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Espectadores actuales:</span>
            <span className="bg-white text-green-700 px-3 py-1 rounded-full font-bold">{stats.viewerStats.online}</span>
          </div>
        </div>
      )}
      
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Ganancias Hoy</h3>
          <p className="text-3xl font-bold text-gray-800">${stats.earnings.today}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Ganancias Esta Semana</h3>
          <p className="text-3xl font-bold text-gray-800">${stats.earnings.thisWeek}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Espectadores Hoy</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.viewerStats.totalToday}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Nuevos Seguidores</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.viewerStats.newFollowers}</p>
        </div>
      </div>
      
      {/* Ganancias pendientes y datos del perfil */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ganancias Pendientes</h2>
          <div className="mb-4">
            <p className="text-2xl font-bold text-pink-600">${stats.earnings.pending}</p>
            <p className="text-sm text-gray-500">Disponible para retiro</p>
          </div>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 w-full">
            Solicitar Pago
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Perfil</h2>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-700">Estado del perfil</h3>
              <div className="flex items-center mt-1">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-600 font-medium">Verificado</span>
              </div>
            </div>
            
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-700">Seguidores</h3>
              <p className="mt-1">{stats.viewerStats.followers}</p>
            </div>
            
            <div>
              <Link href="/dashboard/model/edit-profile" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full">
                Editar Perfil
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Historial de transmisiones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Transmisiones</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Fecha</th>
                <th scope="col" className="px-6 py-3">Duración</th>
                <th scope="col" className="px-6 py-3">Espectadores</th>
                <th scope="col" className="px-6 py-3">Ganancias</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stats.streamHistory.map((stream, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{stream.date}</td>
                  <td className="px-6 py-4">{stream.duration}</td>
                  <td className="px-6 py-4">{stream.viewers}</td>
                  <td className="px-6 py-4">${stream.earnings}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900">Ver detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}