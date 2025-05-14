'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  modalType: 'delete' | 'update' | null;
  openModal: (modalType: 'delete' | 'update') => void;
  closeModal: () => void;
}

const ModalContext = createContext({} as ModalContextType);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  
  const [modalType, setModalType] = useState<'delete' | 'update' | null>(null);

  const openModal = (modalType: 'delete' | 'update') => {
    setModalType(modalType)
  }

  const closeModal = () => {
    setModalType(null)
  };

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
