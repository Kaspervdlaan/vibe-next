import React, { useEffect, useRef } from 'react';
import { Box } from '../../atoms/Box';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import './_modal.scss';

type ModalVariant = 'centered' | 'fullscreen';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Visual variant */
  variant?: ModalVariant;
  /** Size of the modal (only applies to centered variant) */
  size?: ModalSize;
  /** Show close button (default: true) */
  showCloseButton?: boolean;
  /** Prevent closing on overlay click (default: false) */
  preventCloseOnOverlayClick?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Footer content (buttons, etc.) */
  footer?: React.ReactNode;
}

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  variant = 'centered',
  size = 'md',
  showCloseButton = true,
  preventCloseOnOverlayClick = false,
  className = '',
  children,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle Escape key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();
    modal.addEventListener('keydown', handleTab);
    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, [open]);

  if (!open) return null;

  const classNames = [
    'modal',
    `modal--${variant}`,
    variant === 'centered' && `modal--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!preventCloseOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div ref={modalRef} className={classNames}>
        <div className="modal__content">
          {(title || showCloseButton) && (
            <Box
              className="modal__header"
              display="flex"
              align="center"
              justify="space-between"
              padding="md"
            >
              {title && (
                <Typography variant="h3" className="modal__title" id="modal-title">
                  {title}
                </Typography>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="modal__close"
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </Button>
              )}
            </Box>
          )}

          <Box className="modal__body" padding="md">
            {children}
          </Box>

          {footer && (
            <Box
              className="modal__footer"
              display="flex"
              align="center"
              justify="flex-end"
              gap="md"
              padding="md"
            >
              {footer}
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

export default Modal;

