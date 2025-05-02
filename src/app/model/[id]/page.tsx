// src/app/model/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Datos de prueba
const MODEL_DATA = {
  id: 1,
  username: "Sofia_charm",
  isOnline: true,
  age: 24,
  location: "Colombia",
  languages: ["Español", "Inglés"],
  bio: "¡Hola a todos! Me encanta bailar y conversar. Siéntanse como en casa en mi sala.",
  tags: ["latina", "dance", "new"],
  viewers: 245,
  onlineTime: "2h 15m",
  pricing: {
    public: "Gratis",
    private: "50 tokens/min",
    spy: "25 tokens/min",
  }
};

// Mock chat messages para prueba
const INITIAL_CHAT_MESSAGES = [
  { id: 1, username: "user123", message: "Hola Sofia, te ves increíble hoy!", type: "user" },
  { id: 2, username: "Sofia_charm", message: "¡Gracias! ¿Cómo estás? 😊", type: "model" },
  { id: 3, username: "fan_forever", message: "¿Puedes bailar para nosotros?", type: "user" },
  { id: 4, username: "Sofia_charm", message: "¡Claro! Denme un momento...", type: "model" },
  { id: 5, username: "new_visitor", message: "Primera vez aquí, eres hermosa!", type: "user" },
  { id: 6, username: "Sofia_charm", message: "¡Bienvenido! Gracias por acompañarme hoy 💕", type: "model" }
];

export default function ModelProfile({ params }: { params: { id: string } }) {
  const [model, setModel] = useState(MODEL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  // En un caso real, cargaríamos los datos del modelo desde la API
  useEffect(() => {
    // Aquí iría una llamada a la API para obtener los datos del modelo con el ID
    console.log(`Cargando modelo con ID: ${params.id}`);
    // setModel(fetchedModel);
  }, [params.id]);

  // Función para enviar un mensaje al chat
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: chatMessages.length + 1,
      username: "Tú", // En producción sería el username real del usuario
      message: newMessage,
      type: "user"
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage("");
    
    // Aquí iría la lógica para enviar el mensaje al socket/backend
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal: Stream y detalles del modelo */}
        <div className="lg:col-span-2">
          {/* Transmisión en vivo */}
          <div className="bg-black rounded-lg overflow-hidden aspect-video mb-4">
            {model.isOnline ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                {/* En producción, aquí iría el componente real de streaming */}
                <p className="text-xl">Transmisión en vivo de {model.username}</p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-gray-800">
                <p className="text-xl">{model.username} no está en línea ahora</p>
              </div>
            )}
          </div>

          {/* Información y controles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-pink-600">{model.username}</h1>
              <div className="flex items-center space-x-2">
                <span className={`h-3 w-3 rounded-full ${model.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span>{model.isOnline ? 'En línea' : 'Desconectada'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detalles básicos */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Detalles</h2>
                <ul className="space-y-1 text-gray-700">
                  <li><span className="font-medium">Edad:</span> {model.age}</li>
                  <li><span className="font-medium">Ubicación:</span> {model.location}</li>
                  <li><span className="font-medium">Idiomas:</span> {model.languages.join(", ")}</li>
                  {model.isOnline && <li><span className="font-medium">Tiempo en línea:</span> {model.onlineTime}</li>}
                  <li><span className="font-medium">Espectadores:</span> {model.viewers}</li>
                </ul>
              </div>

              {/* Precios */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Precios</h2>
                <ul className="space-y-1 text-gray-700">
                  <li><span className="font-medium">Público:</span> {model.pricing.public}</li>
                  <li><span className="font-medium">Privado:</span> {model.pricing.private}</li>
                  <li><span className="font-medium">Espía:</span> {model.pricing.spy}</li>
                </ul>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Sobre mí</h2>
              <p className="text-gray-700">{model.bio}</p>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {model.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
                Chat Privado
              </button>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                Modo Espía
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                Enviar Propina
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                Seguir
              </button>
            </div>
          </div>
        </div>

        {/* Chat en vivo */}
        <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
          <div className="p-4 bg-pink-600 text-white font-semibold rounded-t-lg">
            Chat en vivo
          </div>
          
          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`${msg.type === 'model' ? 'bg-pink-100' : 'bg-gray-100'} p-2 rounded-lg`}>
                <span className={`font-bold ${msg.type === 'model' ? 'text-pink-600' : 'text-gray-700'}`}>
                  {msg.username}:
                </span> {msg.message}
              </div>
            ))}
          </div>
          
          {/* Formulario de entrada */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button 
                type="submit" 
                className="bg-pink-600 text-white px-4 py-2 rounded-r-lg hover:bg-pink-700 transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}