import { useEffect, type ReactNode } from "react";
import styled from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClic = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClick);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscClick);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClic}
    >
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
