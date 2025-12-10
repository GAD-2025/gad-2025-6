import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 24px 16px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return createPortal(
    <ModalWrapper>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>,
    document.getElementById('root')
  );
};

export default Modal;
