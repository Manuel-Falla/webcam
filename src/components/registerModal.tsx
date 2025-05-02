// components/RegisterModal.tsx (con validación)
import React, { useState } from 'react';
import Modal from './modal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{username?: string; email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {username?: string; email?: string; password?: string} = {};
    
    if (!username.trim()) {
      newErrors.username = 'Por favor ingresa un nombre de usuario';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    
    if (!password) {
      newErrors.password = 'Por favor ingresa una contraseña';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí iría la lógica de registro
      console.log('Registrando:', username, email, password);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-6">Crear cuenta gratis</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.username ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-pink-700 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors"
          >
            Crear cuenta
          </button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-300 mb-2">O continuar con:</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
              G
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full">
              X
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <button 
              className="text-pink-400 hover:underline" 
              onClick={onSwitchToLogin}
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;