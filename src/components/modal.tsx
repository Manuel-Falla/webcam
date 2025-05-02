// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay semi-transparente */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Contenedor del modal */}
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;