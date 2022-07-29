import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
  const el = useRef(null);
  if (!el.current) {
    el.current = document.createElement('div');
  }

  useEffect(() => {
    modalRoot.appendChild(el.current);
    return () => modalRoot.removeChild(el.current);
  });

  return createPortal(<div className='flex flex-col items-center justify-center'>{children}</div>, el.current);
};

export default Modal;
