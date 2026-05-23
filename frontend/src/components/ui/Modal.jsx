import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ open, onClose, title, description, children, size = 'md', footer }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 animate-fade-in bg-zinc-900/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={`animate-scale-in relative w-full ${sizes[size]} overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl`}
      >
        {(title || description) && (
          <div className="border-b border-zinc-100 px-6 py-5">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold tracking-tight text-zinc-900">
                {title}
              </h2>
            )}
            {description && <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{description}</p>}
          </div>
        )}
        {children && <div className="px-6 py-5">{children}</div>}
        {footer && (
          <div className="flex flex-col-reverse gap-2 border-t border-zinc-100 bg-zinc-50/80 px-6 py-4 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
