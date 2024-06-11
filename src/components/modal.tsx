import React, { ReactNode } from 'react';
import '../App.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                {children}
                <button className="modal-save" onClick={onSave}>Simpan</button>
            </div>
        </div>
    );
};

export default Modal;
