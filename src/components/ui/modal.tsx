import * as React from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils'; // Função auxiliar para gerenciar classes condicionalmente, caso tenha configurado essa função.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed inset-0 z-50 m-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {title && <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>}
        {description && <DialogDescription className="text-sm text-muted mb-4">{description}</DialogDescription>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
