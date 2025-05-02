// components/PasswordRecoveryModal.tsx
import React, { useState } from 'react';
import Modal from './modal';

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchToLogin 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    
    // Aquí iría la lógica para enviar el correo de recuperación
    console.log('Enviando correo de recuperación a:', email);
    
    // Simulamos éxito
    setIsSubmitted(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-6">
          Recuperar contraseña
        </h2>
        
        {!isSubmitted ? (
          <>
            <p className="text-gray-300 mb-4 text-center">
              Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-2 px-4 bg-pink-700 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors"
              >
                Enviar instrucciones
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-400 text-5xl mb-4">✓</div>
            <p className="text-gray-300 mb-4">
              Hemos enviado instrucciones para recuperar tu contraseña a <strong>{email}</strong>.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button 
            className="text-pink-400 hover:underline" 
            onClick={onSwitchToLogin}
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordRecoveryModal;