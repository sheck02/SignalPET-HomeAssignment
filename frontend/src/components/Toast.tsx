import React from 'react';

type Props = {
  message: string;
  onClose: () => void;
};

const toastStyles = {
  position: 'fixed' as const,
  bottom: '2rem',
  right: '2rem',
  backgroundColor: '#ff4d4f',
  color: '#fff',
  padding: '1rem 1.5rem',
  borderRadius: '6px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  zIndex: 9999,
};

const closeBtnStyle = {
  marginLeft: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold' as const,
};

export const Toast: React.FC<Props> = ({ message, onClose }) => (
  <div style={toastStyles}>
    ⚠️ {message}
    <span style={closeBtnStyle} onClick={onClose}>
      ×
    </span>
  </div>
);